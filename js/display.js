class DisplayService {
  /**
   *
   * @param {Window} window - The window object.
   * @param {InteractionLoggingService} interactionLoggingService - The interaction logging service.
   */
  constructor(window, interactionLoggingService) {
    this.document = window.document;
    this.interactionLoggingService = interactionLoggingService;
    this._q = [];
    this._ready = !!window.document.body;
    if (!this._ready) {
      this.document.addEventListener("DOMContentLoaded", () => {
        this._ready = true;
        this._q.forEach(([fn, ...args]) => this[fn] && this[fn](...args));
      });
    }
  }

  queueIfNotReady(...args) {
    if (this._ready) {
      return false;
    }
    this._q.push(args);
    return true;
  }

  logInteractionDismissed(interaction) {
    this.interactionLoggingService.callInteractionPixel(
      interaction,
      "onDismiss"
    );
  }

  logInteractionClicked(interaction) {
    this.interactionLoggingService.callInteractionPixel(interaction, "onClick");
  }

  applyStyleToElement(div, style) {
    Object.keys(style).forEach((key) => {
      div.style[key] = style[key];
    });
  }

  createDiv(style, cssClass = "interactDiv") {
    const div = this.document.createElement("div");
    div.classList.add(cssClass);
    this.applyStyleToElement(div, style);
    return div;
  }

  appendDivToBody(div) {
    this.document.body.appendChild(div);
  }

  setDisplayProperty(div, value) {
    div.style.display = value;
  }

  hideDiv(div) {
    this.setDisplayProperty(div, "none");
  }

  removeDiv(div) {
    div.remove();
  }

  addCloseButtonToDivTopRight(interaction, div) {
    const closeButton = this.document.createElement("button");
    div.style.display = "relative";
    closeButton.textContent = "X";
    const style = {
      background: "transparent",
      border: "unset",
      cursor: "pointer",
      position: "absolute",
      top: "0",
      right: "0",
    };
    this.applyStyleToElement(closeButton, style);

    closeButton.addEventListener(
      "click",
      function () {
        this.logInteractionDismissed(interaction);
        this.removeDiv(div);
      }.bind(this)
    );
    div.appendChild(closeButton);
  }

  applyClickOutsideToClose(interaction, div) {
    const listener = this.document.addEventListener(
      "click",
      function (event) {
        if (!div.contains(event.target)) {
          this.logInteractionDismissed(interaction);
          this.removeDiv(div);
          this.document.removeEventListener("click", listener);
        }
      }.bind(this)
    );
  }

  redirect(url) {
    window.open(url, "_blank");
  }

  applyIframeClickRedirect(interaction, iframe, redirectUrl) {
    window.addEventListener(
      "message",
      (e) => {
        const key = e.message ? "message" : "data";
        const data = e[key];
        if (data === "zeoFrameClick") {
          this.logInteractionClicked(interaction);
          this.redirect(redirectUrl);
          this.removeDiv(iframe);
        }
      },
      false
    );
  }

  getStyleForConfig(config = "") {
    switch (config) {
      case "center":
        return {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        };
      case "bottom":
        return {
          position: "absolute",
          bottom: "0",
          left: "0",
        };
      default:
        return {};
    }
  }
  addImageWithAnchor(interaction, div, options) {
    const { imageUrl, anchorUrl } = options;
    const openInNewPage = interaction?.configDetails?.openInNewPage ?? false;
    const anchor = this.document.createElement("a");
    anchor.href = anchorUrl;

    anchor.target = openInNewPage ? "_blank" : "_self";
    anchor.addEventListener("click", function () {
      this.logInteractionClicked(interaction);
      this.removeDiv(div);
    });
    const image = this.document.createElement("img");
    image.src = imageUrl;
    anchor.appendChild(image);
    div.appendChild(anchor);
  }

  appendIframeToDiv(interaction, div, src, redirectUrl = "#") {
    const iframe = this.document.createElement("iframe");
    iframe.src = src;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "unset";
    iframe.onload = function () {
      this.applyIframeClickRedirect(interaction, div, redirectUrl);
    }.bind(this);
    div.appendChild(iframe);
    return iframe;
  }

  displayPopupInteraction(interaction) {
    if (this.queueIfNotReady("displayPopupInteraction", interaction)) {
      return;
    }
    const configDetails = interaction?.configDetails || {};
    const positionDetails = this.getStyleForConfig(configDetails.position);
    const sizeDetails = configDetails.sizeDetails || {};
    const redirectUrl = configDetails.redirectUrl || "";
    const tagType = configDetails.tagType || "";
    const src = configDetails.src || "";
    const tintBackgroundForPopup =
      configDetails.tintBackgroundForPopup || false;
    const tintBackgroundColor =
      configDetails.tintBackgroundColor || "rgba(0,0,0,0.5)";
    const defaultPopupStyle = {
      "z-index": "9999999", // max possible value
    };
    const tintDiv = this.createDiv(
      {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: tintBackgroundColor, // this should be taken from config
        "z-index": "9999998",
      },
      "containerDiv"
    );

    if (src) {
      const testDiv = this.createDiv({
        ...defaultPopupStyle,
        ...positionDetails,
        ...sizeDetails,
      });

      this.addCloseButtonToDivTopRight(interaction, testDiv);
      // this.applyClickOutsideToClose(interaction, testDiv);
      if (tagType === "image") {
        this.addImageWithAnchor(interaction, testDiv, {
          imageUrl: src,
          anchorUrl: redirectUrl,
        });
      } else {
        this.appendIframeToDiv(interaction, testDiv, src, redirectUrl);
      }
      if (tintBackgroundForPopup) {
        tintDiv.appendChild(testDiv);
        testDiv.remove = () => {
          tintDiv.remove();
        };
        this.appendDivToBody(tintDiv);
      } else {
        this.appendDivToBody(testDiv);
      }
      // const iframe =
    }
  }
}

class InteractionLoggingService {
  callInteractionPixel(...args) {
    console.log("InteractionLoggingService.callInteractionPixel", ...args);
  }
}

function main() {
  const displayService = new DisplayService(
    window,
    new InteractionLoggingService()
  );
  displayService.displayPopupInteraction({
    configDetails: {
      position: "center",
      sizeDetails: {
        width: "fit-content",
        height: "fit-content",
      },
      src: "http://localhost:8080/test-pages/sample.html",
      redirectUrl: "http://localhost:8080/test-pages/sample.html",
      tagType: "iframe",
      tintBackgroundForPopup: true,
      tintBackgroundColor: "rgba(0,0,0,0.5)",
    },
  });
}

main();
