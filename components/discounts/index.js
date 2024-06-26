const discountComponentUrl = "http://localhost:8080/components/discounts";

window.MyDiscountCoupon = zoid.create({
  // The html tag used to render my component
  tag: "my-discount-component",
  dimensions: {
    width: "100%",
    height: "100%",
  },
  // The url that will be loaded in the iframe or popup, when someone includes my component on their page
  url: ({ props }) => {
    if (!!props?.url) return new URL(props.url).href;
    return discountComponentUrl;
  },

  props: {
    onDiscountApplied: {
      type: "function",
    },
    queryProps: {
      type: "object",
      required: "false",
    },
  },
});

function signalDiscountApplied() {
  console.log("Discount applied!");

  if (
    window.xprops &&
    window.xprops.onDiscountApplied &&
    typeof window.xprops.onDiscountApplied === "function"
  ) {
    console.log("Calling back Zoid connector with Iframe for MyDiscountCoupon");
    window.xprops.onDiscountApplied(readDiscountParam());
  }
}

function readQueryParams() {
  const queryParams = new URLSearchParams(window.location.search);
  const queryParamsObj = {};

  for (const [key, value] of queryParams.entries()) {
    queryParamsObj[key] = value;
  }

  return queryParamsObj;
}

function readDiscountParam() {
  const queryParams = readQueryParams();
  return !!queryParams.discount ? `${queryParams.discount} %` : "10%";
}

function applyDiscountToSpan() {
  const discount = readDiscountParam();
  const span = document.querySelector("#discount");
  span.innerText = discount;
}
