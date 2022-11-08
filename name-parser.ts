export const NameParser = (function () {
  function NameParser() {
    return NameParser;
  }

  function isLength<T>(arr: T[], length: number): arr is T[] {
    return arr.length === length;
  }

  // split full names into the following parts:
  // - prefix / salutation  (Mr., Mrs., etc)
  // - given name / first name
  // - middle initials
  // - surname / last name
  // - suffix (II, Phd, Jr, etc)
  NameParser.parse = function (fullastName: string) {
    fullastName = fullastName.trim();

    let lastName = "";
    let firstName = "";
    let initials = "";
    let word = "";
    let j = 0;
    let i = 0;

    // split into words
    // completely ignore any words in parentheses
    const nameParts = fullastName.split(" ").filter((namePart) => namePart.indexOf("(") === -1);

    const numWords = nameParts.length;
    if (isLength(nameParts, 0)) {
      throw new Error("Something went wrong");
    }
    // is the first word a title? (Mr. Mrs, etc)
    const salutation = this.is_salutation(nameParts[0]);
    const suffix = this.is_suffix(nameParts[numWords - 1]);
    // set the range for the middle part of the name (trim prefixes & suffixes)
    const start = salutation ? 1 : 0;
    const end = suffix ? numWords - 1 : numWords;

    word = nameParts[start];
    // if we start off with an initial, we'll call it the first name
    if (this.is_initial(word)) {
      // if so, do a look-ahead to see if they go by their middle name
      // for ex: "R. Jason Smith" => "Jason Smith" & "R." is stored as an initial
      // but "R. J. Smith" => "R. Smith" and "J." is stored as an initial
      if (this.is_initial(nameParts[start + 1])) {
        firstName += " " + word.toUpperCase();
      } else {
        initials += " " + word.toUpperCase();
      }
    } else {
      firstName += " " + this.fix_case(word);
    }

    // concat the first name
    for (i = start + 1; i < end - 1; i++) {
      word = nameParts[i];
      // move on to parsing the last name if we find an indicator of a compound last name (Von, Van, etc)
      // we do not check earlier to allow for rare cases where an indicator is actually the first name (like "Von Fabella")
      if (this.is_compound_lastName(word)) {
        if (!(this.is_initial(word) && word === word.toUpperCase())) {
          //If it's one letter and capitalized, consider it a middle initial
          break;
        }
      }

      if (this.is_initial(word)) {
        initials += " " + word.toUpperCase();
      } else {
        firstName += " " + this.fix_case(word);
      }
    }

    // check that we have more than 1 word in our string
    if (end - start > 1) {
      // concat the last name
      for (j = i; j < end; j++) {
        lastName += " " + this.fix_case(nameParts[j]);
      }
    }

    // return the various parts in an array
    return {
      salutation: salutation || "",
      firstName: firstName.trim(),
      initials: initials.trim(),
      lastName: lastName.trim(),
      suffix: suffix || "",
    };
  };

  NameParser.removeIgnoredChars = function (word: string) {
    //ignore periods
    return word.replace(".", "");
  };

  // detect and format standard salutations
  // I'm only considering english honorifics for now & not words like
  NameParser.is_salutation = function (word: string) {
    word = this.removeIgnoredChars(word).toLowerCase();
    // returns normalized values
    if (word === "mr" || word === "master" || word === "mister") {
      return "Mr.";
    } else if (word === "mrs") {
      return "Mrs.";
    } else if (word === "miss" || word === "ms") {
      return "Ms.";
    } else if (word === "dr") {
      return "Dr.";
    } else if (word === "rev") {
      return "Rev.";
    } else if (word === "fr") {
      return "Fr.";
    } else {
      return false;
    }
  };

  //  detect and format common suffixes
  NameParser.is_suffix = function (word: string) {
    word = this.removeIgnoredChars(word).toLowerCase();
    // these are some common suffixes - what am I missing?
    const suffixArray = [
      "I",
      "II",
      "III",
      "IV",
      "V",
      "Senior",
      "Junior",
      "Jr",
      "Sr",
      "PhD",
      "APR",
      "RPh",
      "PE",
      "MD",
      "MA",
      "DMD",
      "CME",
      "BVM",
      "CFRE",
      "CLU",
      "CPA",
      "CSC",
      "CSJ",
      "DC",
      "DD",
      "DDS",
      "DO",
      "DVM",
      "EdD",
      "Esq",
      "JD",
      "LLD",
      "OD",
      "OSB",
      "PC",
      "Ret",
      "RGS",
      "RN",
      "RNC",
      "SHCJ",
      "SJ",
      "SNJM",
      "SSMO",
      "USA",
      "USAF",
      "USAFR",
      "USAR",
      "USCG",
      "USMC",
      "USMCR",
      "USN",
      "USNR",
    ];

    const suffixIndex = suffixArray
      .map(function (suffix) {
        return suffix.toLowerCase();
      })
      .indexOf(word);

    if (suffixIndex >= 0) {
      return suffixArray[suffixIndex];
    } else {
      return false;
    }
  };

  // detect compound last names like "Von Fange"
  NameParser.is_compound_lastName = function (word: string) {
    word = word.toLowerCase();
    // these are some common prefixes that identify a compound last names - what am I missing?
    const words = [
      "vere",
      "von",
      "van",
      "de",
      "del",
      "della",
      "di",
      "da",
      "pietro",
      "vanden",
      "du",
      "st.",
      "st",
      "la",
      "lo",
      "ter",
      "o",
      "o'",
      "mac",
      "fitz",
    ];
    return words.indexOf(word) >= 0;
  };

  // single letter, possibly followed by a period
  NameParser.is_initial = function (word: string) {
    if (!word) {
      return false;
    }
    word = this.removeIgnoredChars(word);
    return word.length === 1;
  };

  // detect mixed case words like "McDonald"
  // returns false if the string is all one case
  NameParser.is_camel_case = function (word: string) {
    const ucReg = /[A-Z]+/;
    const lcReg = /[a-z]+/;
    return ucReg.exec(word) && lcReg.exec(word);
  };

  // ucfirst words split by dashes or periods
  // ucfirst all upper/lower strings, but leave camelcase words alone
  NameParser.fix_case = function (word: string) {
    // uppercase words split by dashes, like "Kimura-Fay"
    word = this.safe_ucfirst("-", word);
    // uppercase words split by periods, like "J.P."
    word = this.safe_ucfirst(".", word);
    return word;
  };

  // helper for this.fix_case
  // uppercase words split by the seperator (ex. dashes or periods)
  NameParser.safe_ucfirst = function (seperator: "-" | ".", word: string) {
    return word
      .split(seperator)
      .map((thisWord) => {
        if (this.is_camel_case(thisWord)) {
          return thisWord;
        } else {
          return thisWord.substr(0, 1).toUpperCase() + thisWord.substr(1).toLowerCase();
        }
      })
      .join(seperator);
  };

  return NameParser;
})();
