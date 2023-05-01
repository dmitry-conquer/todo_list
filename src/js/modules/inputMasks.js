import IMask from "imask"; // Маски текстовых полей

// ! html attributes ->
// data - mask="tel"
// data - mask="num-only"

export function inputMask(form) {
  form.addEventListener("focusin", (e) => {
    if (e.target.dataset.mask === "tel") {
      const maskOptions = {
        mask: "+{38}(000)000-00-00",
        lazy: false,
      };
      IMask(e.target, maskOptions);
    }
    if (e.target.dataset.mask === "num-only") {
      const maskOptions = {
        mask: /^[0-9]{1,6}$/,
        // lazy: false,
      };
      IMask(e.target, maskOptions);
    }
  });
}
