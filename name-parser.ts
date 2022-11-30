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
    fullastName = this.strip_enclosing_specialchars(fullastName.trim());

    let lastName = "";
    let firstName = "";
    let initials = "";
    let word = "";
    let j = 0;
    let i = 0;

    // split into words
    // completely ignore any words in parentheses
    let nameParts = fullastName
      .replace(/\s+/g, " ")
      .split(" ")
      .filter(
        (namePart) =>
          !(
            namePart.includes("(") ||
            namePart.includes(")") ||
            namePart.includes("The")
          )
      );

    const numWords = nameParts.length;

    let { removedPart, salutation, updatedNameParts } =
      this.getSalutationAndRemoveCommaName(nameParts);

    let suffix: string | undefined = "";
    // check for suffixes only if name consists more than 2 parts
    if (numWords > 2) {
      for (let i = numWords - 1; i > 1; i--) {
        const namePart = nameParts[i];
        if (!namePart) {
          break;
        }
        const isSuffix = this.is_suffix(namePart);
        if (!isSuffix) {
          break;
        }
        // add removed part before suffix
        if (removedPart) {
          updatedNameParts.splice(i - 1, 0, removedPart);
          removedPart = undefined;
        }
        // update suffix
        suffix = (`${isSuffix} ` + suffix).trim();
      }
    }

    // if we don't have suffix add it at the end
    if (removedPart) {
      updatedNameParts.push(removedPart);
    }

    nameParts = updatedNameParts;

    if (isLength(nameParts, 0)) {
      throw new Error("Something went wrong");
    }

    // set the range for the middle part of the name (trim prefixes & suffixes)
    const start = salutation ? salutation.split(" ").length : 0;
    // const end = suffix ? numWords - 1 : numWords;
    const end = suffix ? numWords - suffix.split(" ").length : numWords;

    word = nameParts[start];
    // if we start off with an initial, we'll call it the first name
    if (this.is_initial(word)) {
      firstName += " " + word.toUpperCase();
      initials += word.replace(".", "").toUpperCase() + ".";
    } else {
      firstName += " " + this.fix_case(word);
      initials += word.toUpperCase().substring(0, 1) + ".";
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
        initials += " " + word.replace(".", "").toUpperCase() + ".";
        firstName += " " + word.toUpperCase();
      } else {
        if (firstName && i === end - 1) {
          lastName += " " + this.fix_case(word);
        } else {
          firstName += " " + this.fix_case(word);
          initials += " " + this.fix_case(word).substring(0, 1) + ".";
        }
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
      salutation: salutation.replace(",", "") || undefined,
      firstName: firstName.trim().replace(",", "") || undefined,
      initials: initials.trim().replace(",", "") || undefined,
      lastName: this.removeIgnoredChars(lastName.trim()) || undefined,
      suffix: suffix || undefined,
    };
  };

  NameParser.getSalutationAndRemoveCommaName = function (nameParts: string[]) {
    let removedPart;
    let salutation = "";
    const updatedNameParts = [...nameParts];
    // is the first words a title? (Mr. Mrs, etc)
    for (const i in nameParts) {
      const namePart = nameParts[i];
      if (!namePart) {
        break;
      }
      salutation = salutation.trim();
      const isSalutation = this.is_salutation(namePart);
      if (!isSalutation) {
        /* if non-salutation part has comma remove and add at the end, so later
        we grab firstname/lastname correctly */
        // For example: Fraser, Joshua -> Joshua Fraser,
        if (namePart.indexOf(",") !== -1) {
          updatedNameParts.splice(Number(i), 1);
          // store removed part in a variable later we will add it right before suffix
          removedPart = namePart;
        }
        break;
      }
      salutation += ` ${isSalutation}`;
    }
    return { removedPart, salutation, updatedNameParts };
  };

  NameParser.removeIgnoredChars = function (word: string) {
    //ignore periods
    return word.replace(/[.,]/g, "");
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
    } else if (word === "prof") {
      return "Prof.";
    } else if (word === "sir") {
      return "Sir.";
    } else {
      return "";
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
    }

    return "";
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
          return (
            thisWord.substr(0, 1).toUpperCase() +
            thisWord.substr(1).toLowerCase()
          );
        }
      })
      .join(seperator);
  };

  NameParser.strip_enclosing_specialchars = function (word: string) {
    // strip non alphanumeric characters from beginning and end of word
    return word.replace(/^[^\p{L}^(]+/iu, "").replace(/[^\p{L}^.^)]+$/iu, "");
  };

  return NameParser;
})();
