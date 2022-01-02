import { Injectable } from "@angular/core";



@Injectable()
export class JuryVoicesLocalStorageService {
  storage = {};
  constructor() {
    try {
      let storage = JSON.parse(localStorage.getItem("startup_voices"));
      if (storage !== null) {
        this.storage = storage;
      }
    } catch(ex) {
      alert("Need permission for cookies");
    }
  }


  saveVoice(voice): void {
    if (voice.offVoice) {
      delete this.storage[voice.id];
    } else {
      this.storage[voice.id] = voice;
    }
    this.writeStorage();
  }
  clearVoices() {
    try {
      localStorage.removeItem("startup_voices");
    } catch(ex) {

    }
  }

  writeStorage() {
    try {
      localStorage.setItem("startup_voices", JSON.stringify(this.storage));
    } catch(ex) {

    }
  }
}