
export class Model {
  protected old: Map<string, any>;

  update(key: string, value: any) {
    this.old[key] = this[key];
  }


}
