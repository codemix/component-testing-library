import { QA } from "component-testing-library";
import { classNamesToSelector, getIntent, hasClassNames } from "../../utils";
import { Classes } from "@blueprintjs/core";

export class ProgressBarQA extends QA {
  static componentName = "ProgressBar";

  static get selector() {
    return classNamesToSelector(Classes.PROGRESS_BAR);
  }

  get meter() {
    return this.get(ProgressMeterQA);
  }

  get intent() {
    return getIntent(this.element);
  }

  get value() {
    return this.meter.value;
  }

  get hasStripes() {
    return !hasClassNames(this.element, Classes.PROGRESS_NO_STRIPES);
  }

  get hasAnimation() {
    return !hasClassNames(this.element, Classes.PROGRESS_NO_ANIMATION);
  }
}

class ProgressMeterQA extends QA {
  static componentName = "ProgressMeter";

  static get selector() {
    return classNamesToSelector(Classes.PROGRESS_METER);
  }

  get value() {
    const { width } = this.element.style;
    return width == null ? 0 : parseFloat(width) / 100;
  }
}
