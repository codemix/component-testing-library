import { QA, classNamesToSelector } from "component-testing-library";
import { Classes } from "@blueprintjs/core";

export class SliderQA extends QA {
  static componentName = "Slider";

  static get selector() {
    return classNamesToSelector(Classes.SLIDER);
  }

  get track() {
    return this.get(SliderTrackQA);
  }

  get handles() {
    return this.getAll(SliderHandleQA);
  }

  get axis() {
    return this.get(SliderAxisQA);
  }
}

class SliderTrackQA extends QA {
  static componentName = "SliderTrack";

  static get selector() {
    return classNamesToSelector(Classes.SLIDER_TRACK);
  }

  get items() {
    return this.getAll(SliderProgressQA);
  }
}

class SliderHandleQA extends QA {
  static componentName = "SliderHandle";

  static get selector() {
    return classNamesToSelector(Classes.SLIDER_HANDLE);
  }

  get label() {
    return this.get(SliderLabelQA);
  }
}

class SliderProgressQA extends QA {
  static componentName = "SliderProgress";

  static get selector() {
    return classNamesToSelector(Classes.SLIDER_PROGRESS);
  }
}

class SliderAxisQA extends QA {
  static componentName = "SliderAxis";

  static get selector() {
    return classNamesToSelector(Classes.SLIDER_AXIS);
  }
}

class SliderLabelQA extends QA {
  static componentName = "SliderLabel";

  static get selector() {
    return classNamesToSelector(Classes.SLIDER_LABEL);
  }
}
