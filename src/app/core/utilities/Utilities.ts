import * as _ from "lodash";
import { HttpErrorResponse } from '@angular/common/http';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

export enum ResponsiveModes {
  largeScreen = "largeScreen",
  smallScreen = "smallScreen",
  ipad = "ipad",
  mobile = "mobile",
  smallMobile = "smallMobile",
}

export class Utilities {
  areTagsLoading = true;
  tagsError = false;
  private tags: Array<any> = [];
  private defaultCurrency: string = "EGP";
  private defaultLanguage: string = "en";
  private config = localStorage.getItem('config');

  constructor(
  ) { }

  /**
   * Returns the currency of the user from local storage, or the default currency if not found.
   * @returns {string}
   */
  get currency(): string {
    return this.config && JSON.parse(this.config).currency ? JSON.parse(this.config).currency : this.defaultCurrency;
  }

  /**
   * Returns the language of the user from local storage, or the default language if not found.
   * @returns {string}
   */
  get language(): string {
    return this.defaultLanguage;
    // return this.config && JSON.parse(this.config).language ? JSON.parse(this.config).language : this.defaultLanguage;
  }

  /**
   * @description
   * Returns the responsive mode based on the window's inner width.
   * @returns {ResponsiveModes} The responsive mode.
   */
  getResponsiveMode() {
    if (window.innerWidth < 320) {
      return ResponsiveModes.smallMobile;
    }
    if (window.innerWidth < 544) {
      return ResponsiveModes.mobile;
    }
    if (window.innerWidth < 768) {
      return ResponsiveModes.ipad;
    }
    if (window.innerWidth < 992) {
      return ResponsiveModes.smallScreen;
    }
    if (window.innerWidth < 1200) {
      return ResponsiveModes.largeScreen;
    }
  }


  /**
   * Returns the height of a dialog based on the responsive mode.
   * @param defaultModeHeight The height of the dialog in the default mode.
   * @param responsiveHeight The height of the dialog in the mobile mode.
   * @returns The height of the dialog.
   */
  getDialogHeight(defaultModeHeight: string, responsiveHeight = "83%"): string {
    if (this.getResponsiveMode() === ResponsiveModes.mobile) {
      return responsiveHeight;
    }
    return defaultModeHeight;
  }


  /**
   * Returns the width of a dialog based on the responsive mode.
   * @param defaultModeWidth The width of the dialog in the default mode.
   * @param responsiveWidth The width of the dialog in the mobile mode. Defaults to "100%".
   * @returns The width of the dialog.
   */
  getDialogWidth(defaultModeWidth: string, responsiveWidth = "100%"): string {
    if (this.getResponsiveMode() === ResponsiveModes.mobile) {
      return responsiveWidth;
    }
    return defaultModeWidth;
  }


  /**
   * Returns the max-width of a dialog based on the responsive mode.
   * @param defaultModeMaxWidth The max-width of the dialog in the default mode.
   * @param responsiveMaxWidth The max-width of the dialog in the mobile mode. Defaults to "100%".
   * @returns The max-width of the dialog.
   */
  getDialogMaxWidth(
    defaultModeMaxWidth: string,
    responsiveMaxWidth = "100%"
  ): string {
    if (this.getResponsiveMode() === ResponsiveModes.mobile) {
      return responsiveMaxWidth;
    }
    return defaultModeMaxWidth;
  }


  getDialogPosition() {
    if (this.getResponsiveMode() === ResponsiveModes.mobile) {
      return { bottom: "0" };
    }
    return undefined;
  }

 
  /**
   * @description: check incoming date to determine whether this date is today or not.
   * @returns true in case of incoming date is today date, false otherwise.
   */
  isToday(incomingUnixDate: any) {
    const date = new Date(incomingUnixDate);
    const now = new Date();
    if (
      date.getDate() === now.getDate() &&
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth()
    ) {
      return true;
    }
    return false;
  }

/**
 * Returns the first date of the current month.
 * @returns {Date} A Date object representing the first day of the current month.
 */

  getFirstDateOfCurrentMonth() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  /**
   * @description: check incoming date to determine whether this date is yesterday or not.
   * @returns true in case of incoming date is yesterday date, false otherwise.
   */
  isYesterday(incomingUnixDate: any) {
    const date = new Date(incomingUnixDate);
    const now = new Date();
    if (
      date.getDate() === now.getDate() - 1 &&
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth()
    ) {
      return true;
    }
    return false;
  }

/**
 * Returns the name of the day for a given date.
 * @param date - A Date object for which the day name is to be retrieved.
 * @returns {string} The name of the day (e.g., 'Monday', 'Tuesday').
 */

  getDayName(date: Date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }



  getMonthName(date: Date) {
    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return months[date.getMonth()];
  }

  /**
   * @description: Returns a string containing the day and month name of a given date.
   * @param date - A Date object for which the day and month name is to be retrieved.
   * @returns {string} A string containing the day and month name.
   */

  /**
   * @description: Returns a string containing the day and month name of a given date.
   * @param date - A Date object for which the day and month name is to be retrieved.
   * @returns {string} A string containing the day and month name.
   */
  getDayAndMonth(date: Date) {
    const month = this.getMonthName(date);
    return (date.getDate()) + " " + month;
  }



  getDayAndMonthWithYear(value: Date) {
    const date: Date = new Date(value);
    const month = this.getMonthName(date);
    return (date.getDate()) + " " + month + " " + date.getFullYear();
  }


  /**
   * @description: Returns the hours in the locale's preferred 12-hour time format.
   * @param date - A Date object for which the hours is to be retrieved.
   * @returns {string} A string containing the hours in the locale's preferred 12-hour time format.
   */
  getHoursFormat(date: Date) {
    var localeSpecificTime = date.toLocaleTimeString();
    return localeSpecificTime.replace(/:\d+ (AM|PM)/, ' ');
  }

  getHours24Format(date: Date) {
    const time = new Date(date).toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit', hour12: false
    });
    return time;
  }


  getDayFormat(incomingUnixDate: number) {
    const incomingDate = new Date(incomingUnixDate);
    const day = incomingDate.getDate();
    const month = incomingDate.getMonth() + 1; // January is 0
    const year = incomingDate.getFullYear();
    let hours = incomingDate.getHours();
    const AM_PM = hours > 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12
    const minutes =
      incomingDate.getMinutes() < 10
        ? "0" + incomingDate.getMinutes()
        : incomingDate.getMinutes();
    if (this.isToday(incomingDate)) {
      // Example: Today 05:30 PM
      return `Today ${hours}:${minutes} ${AM_PM}`;
    } else if (this.isYesterday(incomingDate)) {
      // Example: Yesterday 05:30 PM
      return `Yesterday ${hours}:${minutes} ${AM_PM}`;
    }
    return `${("0" + day).slice(-2)}-${("0" + month).slice(-2)}-${year}`; // Format will be: dd-mm-yyyy
  }

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Formats a given Unix timestamp into a date string in the format dd-mm-yyyy.
 * @param incomingUnixDate - The Unix timestamp to be formatted.
 * @returns A string representing the date in dd-mm-yyyy format.
 */

/******  e4b3ad61-6ff5-4bfe-8c30-688e09daa8e1  *******/
  getDateFormat(incomingUnixDate: number) {
    const incomingDate = new Date(incomingUnixDate);
    const day = incomingDate.getDate();
    const month = incomingDate.getMonth() + 1; // January is 0
    const year = incomingDate.getFullYear();
    return `${("0" + day).slice(-2)}-${("0" + month).slice(-2)}-${year}`; // Format will be: dd-mm-yyyy
  }


  getDateFormatDayAndMonth(date: Date) {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1; // January is 0
    return `${("0" + day).slice(-2)}.${("0" + month).slice(-2)}`; // Format will be: dd-mm-yyyy
  }


  mapDateForWord(date, withYears?: boolean) {
    if (!date || date === null) {
      return null;
    }
    const monthShortNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const newDate = new Date(date);
    const month = monthShortNames[newDate.getMonth()];
    const day = newDate.getUTCDate();
    const year = newDate.getUTCFullYear();
    let hours = newDate.getHours();
    const AM_PM = hours > 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutes =
      newDate.getMinutes() < 10
        ? "0" + newDate.getMinutes()
        : newDate.getMinutes();
    const second = newDate.getSeconds();
    let parsingDate: string;
    if (withYears) {
      parsingDate = day + " " + month + ". " + year;
    } else {
      parsingDate =
        day +
        " " +
        month +
        ". " +
        year +
        ". " +
        hours +
        ":" +
        minutes +
        ":" +
        second +
        AM_PM;
    }
    return parsingDate;
  }

  mapDateForWordMonthAndYear(date, withYears?: boolean) {
    if (!date || date === null) {
      return null;
    }
    const monthShortNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const newDate = new Date(date);
    const month = monthShortNames[newDate.getMonth()];
    const year = newDate.getUTCFullYear().toString().slice(2);
    let parsingDate: string;
    if (withYears) {
      parsingDate = month + " " + year;
    } else {
      parsingDate =
        month +
        " " +
        year
    }
    return parsingDate;
  }

  /**
   * Adds a new day to the given date. If fromOrTo is 'from', the new date will be the same as the given date.
   * If fromOrTo is 'to', the new date will be the given date plus one day.
   * @param fromOrTo - A string indicating whether the new date should be the given date ('from') or the given date plus one day ('to').
   * @param date - The date to add a new day to.
   * @returns The new date, either the same as the given date or the given date plus one day.
   */
  addNewDayTODateTo(fromOrTo: string, date: any) {
    // I cloned deep in the below line, so that the date in filtering-menu not reflected.
    const newDate = date;
    if (fromOrTo === "from") {
      return newDate.setDate(date.getDate());
    }
    return newDate.setDate(date.getDate() + 1);
  }

  dateToTimestamp(date: string) {
    return new Date(date).getTime();
  }

  /**
   * Prevents the input of any character that is not a digit or the backspace key.
   * @param e - The event containing information about the key that was pressed.
   */
  checkNumberFormat(e: any) {
    const charCode = typeof e.which === "undefined" ? e.keyCode : e.which;
    const charStr = String.fromCharCode(charCode);
    if (!charStr.match(/^[0-9\b]+$/) && charCode !== 0) {
      e.preventDefault();
    }
  }



  checkPasteNumberFormat(event: any) {
    const pastedText = event.clipboardData.getData("text");
    if (!pastedText.match(/^[0-9\b]+$/)) {
      event.preventDefault();
    }
  }

  /**
   * Prevents the input of any character that is not a number, the + or - signs, the decimal point, or the backspace key.
   * @param e - The event containing information about the key that was pressed.
   */

  checkNumberFloat(e) {
    const charCode = typeof e.which === "undefined" ? e.keyCode : e.which;
    const charStr = String.fromCharCode(charCode);
    const currentValue = e.currentTarget.value + charStr;
    const regex = /^[-+]?[0-9]+\.?[0-9]*$/;
    const x = regex.test(currentValue);
    const y = regex.test(charStr);
    if (
      !x ||
      (!y && (charStr !== "." || e.currentTarget.value.includes(".")))
    ) {
      e.preventDefault();
    }
  }

  checkPasteNumberFloat(e) {
    const paste = e.clipboardData.getData("text");
    const regex = /^[-+]?[0-9]+\.?[0-9]*$/;
    const x = regex.test(paste);
    if (!x) {
      e.preventDefault();
    }
  }

  checkNumberInRange(e, max, min) {
    const charCode = typeof e.which === "undefined" ? e.keyCode : e.which;
    const charStr = String.fromCharCode(charCode);
    const currentValue =
      charCode === 8
        ? e.currentTarget.value.substring(0, e.currentTarget.value.length - 1)
        : e.currentTarget.value + charStr;
    // const regex = /^[1-9][0-9]?[0]?$/;
    // const x = regex.test(currentValue);
    const y = charCode === 8 ? true : /[0-9]/.test(charStr);
    if (!y || +currentValue > +max || +currentValue < +min) {
      e.preventDefault();
    }
  }

  /**
   * Prevents the input of any character that is not a digit or the backspace key, by pasting.
   * It also checks if the pasted value is within the given range.
   * @param e - The event containing information about the character that was pasted.
   * @param max - The maximum value.
   * @param min - The minimum value.
   */
  checkPasteNumberInRange(e, max, min) {
    const paste = e.clipboardData.getData("text");
    const regex = new RegExp(
      `/^[0-9]{${(min + "").length},${(max + "").length - 1}}[0]?$/`
    );
    // const x = regex.test(currentValue);
    const isValid = regex.test(paste);
    if (!isValid || +paste > +max || +paste < +min) {
      e.preventDefault();
    }
  }

/**
 * Validates whether a given string is a valid website URL.
 * The URL may optionally include protocols such as ftp, http, or https, and may start with 'www.'.
 * The function checks for valid domain names and optional query parameters.
 * 
 * @param website - The string to be validated as a website URL.
 * @returns A boolean indicating if the input is a valid website URL.
 */

  isValidWebsite(website) {
    const regex = new RegExp(
      /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/i
    );
    return regex.test(website);
  }


  /**
   * Validates whether a given string is a syntactically correct URL.
   * The URL may start with optional protocols such as http or https, and may include 'www.'.
   * The function checks for valid domain names and optional port numbers and paths.
   * 
   * @param website - The string to be validated as a URL.
   * @returns A boolean indicating if the input is a syntactically correct URL.
   */

  isValidLink(website) {
    const regex = new RegExp(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/i
    );
    return regex.test(website);
  }


  /**
   * Validates whether a given string is a valid sub-link.
   * Sub-links are URLs that do not include a protocol or domain name.
   * The function checks if the string starts with a slash and contains at least one alphanumeric character.
   * 
   * @param url - The string to be validated as a sub-link.
   * @returns A boolean indicating if the input is a valid sub-link.
   */
  isValidSubLink(url: any): boolean {
    const regex = new RegExp(/^\/[a-z0-9]/);
    return regex.test(url);
  }

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Validates whether a given string is a valid image path.
   * The image path must include a file name and extension (e.g. .jpg, .png).
   * The function checks if the string does not contain any whitespace characters and ends with a valid image extension.
   * 
   * @param imagePath - The string to be validated as an image path.
   * @returns A boolean indicating if the input is a valid image path.
   */
/******  022c397c-c396-481b-9c54-b7f799746901  *******/
  isValidImage(imagePath: string) {
    const regex = new RegExp(/^([^\\s]+(.*?)[.](jpg|jpeg|png|JPG|JPEG|PNG))$/);
    return regex.test(imagePath);
  }

  isValidMobileNumber(mobileNumber: any) {
    const regex = /^[+]+[0-9]{11,12}$/;
    return regex.test(mobileNumber);
  }

  isValidPhoneNumber(phoneNumber) {
    const regex = /^01[0125]\d{8}$/;
    return regex.test(phoneNumber);
  }

  isValidLandLine(landLine) {
    const regex = /^[0-9]{8,9}$/;
    return regex.test(landLine);
  }

  isValidTollFree(number) {
    const regex = /^0800[0123456789]\d{6}$/;
    return regex.test(number);
  }

  isValidPremiumService(number) {
    const regex = /^09[0123456789]\d{5}$/;
    return regex.test(number);
  }

  isValidFreeInternet(number) {
    const regex = /^07[0123456789]\d{5}$/;
    return regex.test(number);
  }

  isValidShortNumber16(number) {
    const regex = /^16[0123456789]\d{2}$/;
    return regex.test(number);
  }

  isValidShortNumber17(number) {
    const regex = /^17[0123456789]\d{2}$/;
    return regex.test(number);
  }

  isValidShortNumber19(number) {
    const regex = /^19[0123456789]\d{2}$/;
    return regex.test(number);
  }

  isValidInputWithCharacterAndNumbersOnly(text: string) {
    const regex = new RegExp(/^[A-Za-z0-9_-]*$/);
    return regex.test(text);
  }

  isValidDomain(domain: string): boolean {
    const regex: RegExp = new RegExp(/^(?:[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z][a-z]{0,61}[a-z]*$/);
    return regex.test(domain);
  }

  isValidEmail(email) {
    const regex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regex.test(email);
  }

  isValidEmailNote(text: string) {
    const regex = new RegExp(/^(.|\n)*[^\s!@#$%\^&*\(\)\-_{}<>?\[\]"':;+=\/\\](.|\n)*$/);
    return regex.test(text);
  }

  isValidInputWithSpecialCharacters(text: string) {
    const regex = new RegExp(
      /^(.|\s)*[a-zA-Z\u0600-\u06FF\u0750-\u077F](.|\s)*$/
    );
    return regex.test(text);
  }

  isValidInput(text: string) {
    const regex = new RegExp(
      /^([\w\u0600-\u06FF\u0750-\u077F\s._])*[a-zA-Z\u0600-\u06FF\u0750-\u077F]([\w\u0600-\u06FF\u0750-\u077F\s._])*$/
    );
    return regex.test(text);
  }

  isValidInputDescription(text: string) {
    const regex = new RegExp(
      /^(.|\n)*[^\s\d!@#$%\^&*\(\)\-_{}<>?\[\]"':;+=\/\\](.|\n)*$/
    );
    return regex.test(text);
  }

  isValidMailTitle(text) {
    const regex = new RegExp(/^(.)*[a-zA-Z\u0600-\u06FF\u0750-\u077F](.)*$/);
    return regex.test(text);
  }

  isValidInputCode(text: string) {
    const regexp = new RegExp(/^\S+$/);
    return regexp.test(text);
  }

  isValidInputTag(text: string) {
    const regexp = new RegExp(/^[a-zA-Z0-9\u0600-\u06FF\u0750-\u077F]+$/);
    return regexp.test(text);
  }

  getNameShortCut(name: string): string {
    if (!name || !name.length) return "";
    const names = name.trim().split(" ");
    const isArabic = /[\u0621-\u064A]+/gi
    if (isArabic.test(name)) return names[0][0];
    else {
      if (names.length === 1) return names[0][0].toUpperCase();
      return names[0][0].toUpperCase() + names[1][0].toUpperCase();
    }
  }

  handleContactTo(email: string) {
    const mail = document.createElement("a");
    mail.href = "mailto:" + email;
    mail.click();
  }

  private thumbnailify(base64Image, targetSize, callback) {
    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.height = targetSize;
      ctx.drawImage(
        img,
        width > height ? (width - height) / 2 : 0,
        height > width ? (height - width) / 2 : 0,
        width > height ? height : width,
        width > height ? height : width,
        0,
        0,
        targetSize,
        targetSize
      );
      callback(canvas.toDataURL());
    };
    img.src = base64Image;
  }


  getFileErrorLocalizationKey(
    droppedFile: File,
    supportedTypes: Array<string>,
    maxFileSize: number
  ): string {
    if (!this.isFileContainsSupportedTypes(droppedFile, supportedTypes)) {
      return "typesNotSupported";
    }
    if (this.isFileSizeExceedExpectedMaxSize(droppedFile, maxFileSize)) {
      return "fileSizeExceeded";
    }
    return "";
  }

  isFileContainsSupportedTypes(
    droppedFile: File,
    supportedTypes: Array<string>
  ): boolean {
    const fileNameParts = droppedFile.name.split(".");
    const fileExtension = fileNameParts[1];
    if (
      supportedTypes
        .map((supportedType) => supportedType.toLowerCase())
        .includes(fileExtension.toLowerCase())
    ) {
      return true;
    }
    return false;
  }

  isFileSizeExceedExpectedMaxSize(
    droppedFile: File,
    expectedMaxSize: number
  ): boolean {
    if (droppedFile.size / 1024 > expectedMaxSize) {
      return true;
    }
    return false;
  }

  largeNumberFormate(value) {
    if (+value >= 1000 && +value < 1000000) {
      return `${this.isFloat(+value / 1000)
        ? Math.trunc((+value / 1000) * 1000) / 1000
        : +value / 1000
        }K`;
    }
    if (+value >= 1000000 && +value < 1000000000) {
      return `${this.isFloat(+value / 1000000)
        ? Math.trunc((+value / 1000000) * 1000) / 1000
        : +value / 1000000
        }M`;
    }
    if (1000000000000 > +value && +value >= 1000000000) {
      return `${this.isFloat(+value / 1000000000)
        ? Math.trunc((+value / 1000000000) * 1000) / 1000
        : +value / 1000000000
        }B`;
    }
    if (+value >= 1000000000000) {
      const x = value.toString().slice(0, -12);
      return `${this.isFloat(+x) ? Math.trunc(+x * 1000) / 1000 : +x}T`;
    }
    return `${this.isFloat(+value) ? Math.trunc(+value * 1000) / 1000 : +value
      }`;
  }

  numberWithCommas(value: any) {
    return new Intl.NumberFormat().format(value);
  }

  isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
  }


  isValidPassword(password) {
    const regex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
    if (regex.test(password)) {
      return true;
    }
    return false;
  }

  getCurrentAccount() {
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
    //   const json = decode(JSON.parse(credentials).accessToken);
      return {
        // id: json["ACCOUNT_ID"],
        // type: json["ACCOUNT_TYPE"],
      };
    }
    return { id: "", type: "" };
  }

  getUserData() {
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      const json = JSON.parse(credentials).userData;
      return json;
    }
    return {};
  }

  getLastUpdatedBy(element) {
    if (element.lastUpdatedBy && element.lastUpdatedBy.name) {
      return element.lastUpdatedBy;
    } else if (element.createdBy && element.createdBy.name) {
      return element.createdBy;
    }
    return null;
  }

  isSameAccount(accountId: string) {
    const account = this.getCurrentAccount();
    return accountId === account.id;
  }

  getFileExtension(file) {
    return file.name.split(".").pop().toLowerCase();
  }

 
  toPlainString(num) {
    return ("" + num).replace(
      /(-?)(\d*)\.?(\d+)e([+-]\d+)/,
      (a, b, c, d, e) => {
        return e < 0
          ? b + "0." + Array(1 - e - c.length).join("0") + c + d
          : b + c + d + Array(e - d.length + 1).join("0");
      }
    );
  }

  isFullASCIIText(text: string) {
    const fullASCIIPattern = new RegExp(/^[\x00-\x7F]+$/);
    const result = fullASCIIPattern.test(text);
    return result;
  }

  isScriptContainsArabic(script) {
    const patternArbic = new RegExp(/[\u0600-\u06FF\u0750-\u077F]/);
    const result = patternArbic.test(script);
    return result;
  }

  addHTTPOrHTTPs(url: string) {
    let newURL = "";
    if (
      url &&
      url.trim().length > 0 &&
      !(url.startsWith("http://") || url.startsWith("https://"))
    ) {
      newURL = "https://" + url;
    } else {
      newURL = url;
    }
    return newURL;
  }

  private _filter(value, data): string[] {
    const filterValue = value.toLowerCase();
    return data.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  getVideoDuration(attachment, video) {
    if (video) {
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        attachment["videoDuration"] = duration;
        video.controls = false;
      };
    }
    if (!attachment["videoDuration"]) {
      return "";
    }
    const videoTime: any = Math.floor(attachment["videoDuration"]);
    const videoTimeMin: any = Math.floor(
      Math.floor(attachment["videoDuration"]) / 60
    );
    if (videoTimeMin && videoTime >= 60 && /^\d$/.test(videoTimeMin)) {
      return `0${videoTimeMin}:00`;
    } else if (videoTimeMin && !/^\d$/.test(videoTimeMin)) {
      return `${videoTimeMin}:00`;
    } else {
      if (videoTime && /^\d$/.test(videoTime)) {
        return `00:0${Math.floor(attachment["videoDuration"])}`;
      } else {
        return `00:${Math.floor(attachment["videoDuration"])}`;
      }
    }
  }

  getAudioDuration(attachment, audioElement) {
    if (audioElement) {
      audioElement.onloadedmetadata = () => {
        window.URL.revokeObjectURL(audioElement.src);
        const duration = audioElement.duration;
        attachment["audioDuration"] = duration;
      };
    }
    if (!attachment["audioDuration"]) {
      return "";
    }
    const audioTime: any = Math.floor(attachment["audioDuration"]);
    const audioTimeMin: any = Math.floor(
      Math.floor(attachment["audioDuration"]) / 60
    );
    if (audioTimeMin && audioTime >= 60 && /^\d$/.test(audioTimeMin)) {
      return `0${audioTimeMin}:00`;
    } else if (audioTimeMin && !/^\d$/.test(audioTimeMin)) {
      return `${audioTimeMin}:00`;
    } else {
      if (audioTime && /^\d$/.test(audioTime)) {
        return `00:0${Math.floor(attachment["audioDuration"])}`;
      } else {
        return `00:${Math.floor(attachment["audioDuration"])}`;
      }
    }
  }

  getFileAttachmentExtension(file) {
    if (file && file.fileName) {
      return file.fileName.split(".").pop();
    }
    if (file && file.name) {
      return file.name.split(".").pop();
    }
    return "";
  }

  convertHexToRGBA(hex: string, opacity: string | number): string | number {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      // tslint:disable-next-line:no-bitwise
      return (
        "rgba(" +
        [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
        `,${Number(opacity) / 100})`
      );
    }
    return 0;
  }

  getTimeZone() {
    const offset = new Date().getTimezoneOffset();
    const o = Math.abs(offset);
    return (
      (offset < 0 ? "+" : "-") + Math.floor(o / 60)
    );
  }

  isSameArrayData(list1: Array<any>, list2: Array<any>) {
    return list2.length === list1.length && list1.filter((item, index) => {
      return item.id === list2[index].id;
    }).length === list2.length;
  }


  /**
    * @description: get the months range between two dates.
    * @returns number of months betweet the two dates.
    */
  monthDiff(dateFrom, dateTo) {
    return dateTo.getMonth() - dateFrom.getMonth() +
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
  }


  mapColor(color) {
    if (color) {
      if (color.includes('#')) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        if (result) {
          const r = parseInt(result[1], 16);
          const g = parseInt(result[2], 16);
          const b = parseInt(result[3], 16);
          return "rgba(" + r + "," + g + "," + b + ',1)';
        }
      } else if (color.includes('rgb(')) {
        return color.replace('rgb(', 'rgba(').replace(")", ",1)");
      } else {
        return color;
      }
    }
  }

  isValidDateFormat(dateString, isUnixFormat: boolean) {
    if (isUnixFormat) {
      const date = new Date(dateString); // To parse it to default date.
      const day = date.getDate();
      const month = date.getMonth() + 1; // January is 0
      const year = date.getFullYear();
      if (day === 1 && month === 1 && year === 1970) {
        return false;
      }
      dateString = day + '/' + month + '/' + year;
    }

    if (dateString.includes('/') || dateString.includes('-')) {
      const dateSeparator = dateString.includes('/') ? '/' : '-';

      if (dateString.split(dateSeparator).length !== 3) {  // if it not follow the yyyy-mm-dd pattern  return false
        return false;
      } else {
        const Y_M_D_array = dateString.split(dateSeparator);
        const dtYear = Y_M_D_array[0].length === 4 ? Y_M_D_array[0] : Y_M_D_array[2];
        const dtMonth = +Y_M_D_array[1];
        const dtDay = Y_M_D_array[0].length === 4 ? +Y_M_D_array[2] : +Y_M_D_array[0];
        if (dtYear.length !== 4 || isNaN(+dtYear) || isNaN(+dtMonth) || isNaN(+dtDay)) {
          return false;
        }
        if (dtMonth < 1 || dtMonth > 12) {
          return false;
        } else if (dtDay < 1 || dtDay > 31) {
          return false;
        } else if ((dtMonth === 4 || dtMonth === 6 || dtMonth === 9 || dtMonth === 11) && dtDay === 31) {
          return false;
        } else if (dtMonth === 2) {
          const isleap = (+dtYear % 4 === 0 && (+dtYear % 100 !== 0 || +dtYear % 400 === 0));
          if (dtDay > 29 || (dtDay === 29 && !isleap)) {
            return false;
          }
        }
        return true;
      }
    } else {
      return false;
    }
  }

  isSafariBrowser() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
      if (ua.indexOf('chrome') > -1) {
        return false;
      } else {
        return true; // Safari
      }
    }
  }

  isValidUUID(text) {
    const regex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/gi);
    return regex.test(text);
  }

  isValidInputNumber(text: string) {
    const regexp = new RegExp(/^[0-9\b]+$/);
    return regexp.test(text);
  }

  /**
   * @param value percentage
   * @returns If the percentage is a fraction we will return the closer number with one fraction digit, else return the same percentage.
   */
  percentageFormatter(value: any): number {
    value = +value;
    if (Number.isInteger(value)) return value;
    return parseFloat(value.toFixed(1));
  }

  /**
   * @param value Fraction number
   * @returns If the value is a fraction we will return the number with two fraction digits.
   */
  roundNumberFormate(value: number): number {
    const number = +value;
    return Math.round((number + Number.EPSILON) * 100) / 100;
  }


  /**
   * Replaces all spaces in the given text with the specified replacement value.
   * By default, the replacement value is an empty string.
   * @param text The text to replace spaces in.
   * @param replaceValue The value to replace spaces with. Defaults to an empty string.
   * @returns The text with all spaces replaced.
   */
  replaceSpaces(text: string, replaceValue: string = ''): string {
    return text.replace(/\s/g, replaceValue);
  }



  /**
   * Checks if the given text contains any spaces.
   * @param text - The text to check for spaces.
   * @returns True if the text contains at least one space, false otherwise.
   */
  hasSpaces(text: string): boolean {
    return /\s/g.test(text);
  }


  removeSessionStorageItem(key: string): void {
/**
 * Removes multiple items from session storage.
 * @param keys - An array of keys representing the items to be removed from session storage.
 */

/******  833e970f-d08e-4032-bde8-be2213109349  *******/    sessionStorage.removeItem(key);
  }


  /**
   * Removes multiple items from session storage.
   * @param keys - An array of keys representing the items to be removed from session storage.
   */
  removeSessionStorageItems(keys: string[]): void {
    keys.forEach((key: string) => sessionStorage.removeItem(key));
  }

}
