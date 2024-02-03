class Cs142TemplateProcessor {
  constructor(template) {
    this._template = template;
  }

  fillIn(dictionary) {
    let template = this._template;
    for(k in dictionary) {
      template = template.replace(`{{${k}}}`, dictionary[k])
    }
    return template;
  }
}