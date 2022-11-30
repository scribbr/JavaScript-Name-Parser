import { NameParser } from "./name-parser";

test.each([
  {
    name: "John Doe",
    result: {
      firstName: "John",
      lastName: "Doe",
      initials: "J.",
    },
  },
  {
    name: "Mr Anthony R Von Fange III",
    result: {
      salutation: "Mr.",
      firstName: "Anthony R",
      initials: "A. R.",
      lastName: "Von Fange",
      suffix: "III",
    },
  },
  {
    name: "Sara Ann Fraser",
    result: {
      firstName: "Sara Ann",
      initials: "S. A.",
      lastName: "Fraser",
    },
  },
  {
    name: "Adam",
    result: {
      firstName: "Adam",
      initials: "A.",
    },
  },
  {
    name: "Jonathan Smith",
    result: {
      firstName: "Jonathan",
      initials: "J.",
      lastName: "Smith",
    },
  },
  {
    name: "Anthony Von Fange III",
    result: {
      firstName: "Anthony",
      initials: "A.",
      lastName: "Von Fange",
      suffix: "III",
    },
  },
  {
    name: "Mr John Doe",
    result: {
      salutation: "Mr.",
      firstName: "John",
      initials: "J.",
      lastName: "Doe",
    },
  },
  {
    name: "Smarty Pants Phd",
    result: {
      firstName: "Smarty",
      initials: "S.",
      lastName: "Pants",
      suffix: "PhD",
    },
  },
  {
    name: "Mark P Williams",
    result: {
      firstName: "Mark P",
      initials: "M. P.",
      lastName: "Williams",
    },
  },
  {
    name: "Jack O'Neill",
    result: {
      firstName: "Jack",
      initials: "J.",
      lastName: "O'Neill",
    },
  },
  {
    name: "Jack o Neill",
    result: {
      firstName: "Jack",
      initials: "J.",
      lastName: "O Neill",
    },
  },
  {
    name: "Jack O Neill",
    result: {
      firstName: "Jack O",
      initials: "J. O.",
      lastName: "Neill",
    },
  },
  {
    name: "James Norrington",
    result: {
      firstName: "James",
      initials: "J.",
      lastName: "Norrington",
    },
  },
  {
    name: "Hans Christian Anderssen",
    result: {
      firstName: "Hans Christian",
      initials: "H. C.",
      lastName: "Anderssen",
    },
  },
  {
    name: "J. B. Hunt",
    result: {
      firstName: "J. B.",
      initials: "J. B.",
      lastName: "Hunt",
    },
  },
  {
    name: "Edward Senior III",
    result: {
      firstName: "Edward",
      initials: "E.",
      lastName: "Senior",
      suffix: "III",
    },
  },
  {
    name: "Edward Dale Senior II",
    result: {
      firstName: "Edward",
      initials: "E.",
      lastName: "Dale",
      suffix: "Senior II",
    },
  },
  {
    name: "Dale Edward Jones Senior",
    result: {
      firstName: "Dale Edward",
      initials: "D. E.",
      lastName: "Jones",
      suffix: "Senior",
    },
  },
  {
    name: "Jason Rodriguez Sr.",
    result: {
      firstName: "Jason",
      initials: "J.",
      lastName: "Rodriguez",
      suffix: "Sr",
    },
  },
  {
    name: "Jason Senior",
    result: {
      firstName: "Jason",
      initials: "J.",
      lastName: "Senior",
    },
  },
  {
    name: "Bill Junior",
    result: {
      firstName: "Bill",
      initials: "B.",
      lastName: "Junior",
    },
  },
  {
    name: "OLD MACDONALD",
    result: {
      firstName: "Old",
      initials: "O.",
      lastName: "Macdonald",
    },
  },
  {
    name: "James van Allen",
    result: {
      firstName: "James",
      initials: "J.",
      lastName: "Van Allen",
    },
  },
  {
    name: "Jimmy (Bubba) Smith",
    result: {
      firstName: "Jimmy",
      initials: "J.",
      lastName: "Smith",
    },
  },
  {
    name: "Miss Jennifer Shrader Lawrence",
    result: {
      salutation: "Ms.",
      firstName: "Jennifer Shrader",
      initials: "J. S.",
      lastName: "Lawrence",
    },
  },
  {
    name: "Dr. Jonathan Smith",
    result: {
      salutation: "Dr.",
      firstName: "Jonathan",
      initials: "J.",
      lastName: "Smith",
    },
  },
  {
    name: "Ms. Jamie P. Harrowitz",
    result: {
      salutation: "Ms.",
      firstName: "Jamie P.",
      initials: "J. P.",
      lastName: "Harrowitz",
    },
  },
  {
    name: "Rev. Dr John Doe",
    result: {
      salutation: "Rev. Dr.",
      firstName: "John",
      initials: "J.",
      lastName: "Doe",
    },
  },
  {
    name: "Prof. Tyson J. Hirthe",
    result: {
      salutation: "Prof.",
      firstName: "Tyson J.",
      initials: "T. J.",
      lastName: "Hirthe",
    },
  },
  {
    name: "prof Eveline Aufderhar",
    result: {
      salutation: "Prof.",
      firstName: "Eveline",
      initials: "E.",
      lastName: "Aufderhar",
    },
  },
  {
    name: "Mark Peter Williams",
    result: {
      firstName: "Mark Peter",
      initials: "M. P.",
      lastName: "Williams",
    },
  },
  {
    name: "Mark P Williams",
    result: {
      firstName: "Mark P",
      initials: "M. P.",
      lastName: "Williams",
    },
  },
  {
    name: "Mark P. Williams",
    result: {
      firstName: "Mark P.",
      initials: "M. P.",
      lastName: "Williams",
    },
  },
  {
    name: "M Peter Williams",
    result: {
      firstName: "M Peter",
      initials: "M. P.",
      lastName: "Williams",
    },
  },
  {
    name: "M. Peter Williams",
    result: {
      firstName: "M. Peter",
      initials: "M. P.",
      lastName: "Williams",
    },
  },
  {
    name: "M. P. Williams",
    result: {
      firstName: "M. P.",
      initials: "M. P.",
      lastName: "Williams",
    },
  },
  {
    name: "The Rev. Mark Williams",
    result: {
      salutation: "Rev.",
      firstName: "Mark",
      initials: "M.",
      lastName: "Williams",
    },
  },
  {
    name: "Mister Mark Williams",
    result: {
      salutation: "Mr.",
      firstName: "Mark",
      initials: "M.",
      lastName: "Williams",
    },
  },
  {
    name: "Fraser, Joshua",
    result: {
      firstName: "Joshua",
      initials: "J.",
      lastName: "Fraser",
    },
  },
  {
    name: "Mrs. Brown, Amanda",
    result: {
      salutation: "Mrs.",
      firstName: "Amanda",
      initials: "A.",
      lastName: "Brown",
    },
  },
  {
    name: "Mr.\r\nPaul\rJoseph\nMaria\tWinters",
    result: {
      salutation: "Mr.",
      firstName: "Paul Joseph Maria",
      initials: "P. J. M.",
      lastName: "Winters",
    },
  },
  {
    name: "Van Truong",
    result: {
      firstName: "Van",
      initials: "V.",
      lastName: "Truong",
    },
  },
  {
    name: "John Van",
    result: {
      firstName: "John",
      initials: "J.",
      lastName: "Van",
    },
  },
  {
    name: "Mr. Van Truong",
    result: {
      salutation: "Mr.",
      firstName: "Van",
      initials: "V.",
      lastName: "Truong",
    },
  },
  {
    name: "Anthony Von Fange III, PHD",
    result: {
      firstName: "Anthony",
      initials: "A.",
      lastName: "Von Fange",
      suffix: "III PhD",
    },
  },
  {
    name: "Jimmy (Bubba Junior) Smith",
    result: {
      firstName: "Jimmy",
      initials: "J.",
      lastName: "Smith",
    },
  },
  {
    name: "Jonathan Smith, MD",
    result: {
      firstName: "Jonathan",
      initials: "J.",
      lastName: "Smith",
      suffix: "MD",
    },
  },
  {
    name: "Kirk, James T.",
    result: {
      firstName: "James T.",
      initials: "J. T.",
      lastName: "Kirk",
    },
  },
  {
    name: "James B",
    result: {
      firstName: "James",
      initials: "J.",
      lastName: "B",
    },
  },
  {
    name: "Williams, Hank, Jr.",
    result: {
      firstName: "Hank",
      initials: "H.",
      lastName: "Williams",
      suffix: "Jr",
    },
  },
  {
    name: "Sir James Reynolds, Junior",
    result: {
      salutation: "Sir.",
      firstName: "James",
      initials: "J.",
      lastName: "Reynolds",
      suffix: "Junior",
    },
  },
  {
    name: "Sir John Paul Getty Sr.",
    result: {
      salutation: "Sir.",
      firstName: "John Paul",
      initials: "J. P.",
      lastName: "Getty",
      suffix: "Sr",
    },
  },
  {
    name: "etna übel",
    result: {
      firstName: "Etna",
      initials: "E.",
      lastName: "Übel",
    },
  },
  {
    name: "Markus Müller",
    result: {
      firstName: "Markus",
      initials: "M.",
      lastName: "Müller",
    },
  },
  {
    name: "Charles Dixon (20th century)",
    result: {
      firstName: "Charles",
      initials: "C.",
      lastName: "Dixon",
    },
  },
  {
    name: "Smith, John Eric",
    result: {
      firstName: "John Eric",
      initials: "J. E.",
      lastName: "Smith",
    },
  },
  {
    name: "PAUL M LEWIS MR",
    result: {
      firstName: "Paul M Lewis",
      initials: "P. M. L.",
      lastName: "Mr",
    },
  },
  {
    name: "SUJAN MASTER",
    result: {
      firstName: "Sujan",
      initials: "S.",
      lastName: "Master",
    },
  },
  {
    name: "Tiptree, James, Jr",
    result: {
      firstName: "James",
      initials: "J.",
      lastName: "Tiptree",
      suffix: "Jr",
    },
  },
  {
    name: "Miller, Walter M., Jr.",
    result: {
      firstName: "Walter M.",
      initials: "W. M.",
      lastName: "Miller",
      suffix: "Jr",
    },
  },
  {
    name: "Tiptree, James Jr.",
    result: {
      firstName: "James",
      initials: "J.",
      lastName: "Tiptree",
      suffix: "Jr",
    },
  },
  {
    name: "Miller, Walter M. Jr.",
    result: {
      firstName: "Walter M.",
      initials: "W. M.",
      lastName: "Miller",
      suffix: "Jr",
    },
  },
  {
    name: "Thái Quốc Nguyễn",
    result: {
      firstName: "Thái Quốc",
      initials: "T. Q.",
      lastName: "Nguyễn",
    },
  },
  {
    name: "Yumeng Du",
    result: {
      firstName: "Yumeng",
      initials: "Y.",
      lastName: "Du",
    },
  },
  {
    name: "Yumeng Du",
    result: {
      firstName: "Yumeng",
      initials: "Y.",
      lastName: "Du",
    },
  },
  {
    name: "Charles Philip Arthur George Mountbatten-Windsor",
    result: {
      firstName: "Charles Philip Arthur George",
      initials: "C. P. A. G.",
      lastName: "Mountbatten-Windsor",
    },
  },
  {
    name: "Ella Marija Lani Yelich-O'Connor",
    result: {
      firstName: "Ella Marija Lani",
      initials: "E. M. L.",
      lastName: "Yelich-O'Connor",
    },
  },
])("Check Name: %s", ({ name, result }) => {
  expect(NameParser.parse(name)).toEqual(result);
});
