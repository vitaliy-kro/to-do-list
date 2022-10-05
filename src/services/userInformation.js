export class UserInfo {
  constructor() {
    this.id = 0;
    this.name = '';
    this.isLogIn = false;
    this.userImg = '';
  }
  set Id(NewId) {
    this.id = NewId;
  }
  get Id() {
    return this.id;
  }
  resetID() {
    this.id = 0;
  }
  set Name(NewName) {
    this.name = NewName;
  }
  get Name() {
    return this.name;
  }
  resetName() {
    this.name = '';
  }
  set IsLogIn(NewLog) {
    this.isLogIn = NewLog;
  }
  get IsLogIn() {
    return this.isLogIn;
  }
  resetIsLogin() {
    this.isLogIn = false;
  }
  set UserImg(NewImg) {
    this.userImg = NewImg;
  }
  get UserImg() {
    return this.userImg;
  }
  resetUserImg() {
    this.userImg = '';
  }
}
