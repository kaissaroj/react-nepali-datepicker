import { calendarData } from './calendardata'

export const validationFunctions = {
  validateRequiredParameters: function (requiredParameters: object) {
    for (let key in requiredParameters) {
      const value = requiredParameters[key]
      if (typeof value === 'undefined' || value === null) {
        throw new ReferenceError(
          'Missing required parameters: ' +
            Object.keys(requiredParameters).join(', ')
        )
      }
    }
  },
  validateBsYear: function (bsYear: any) {
    if (typeof bsYear !== 'number' || bsYear === null) {
      throw new TypeError('Invalid parameter bsYear value')
    } else if (
      bsYear < calendarData.minBsYear ||
      bsYear > calendarData.maxBsYear
    ) {
      throw new RangeError(
        'Parameter bsYear value should be in range of ' +
          calendarData.minBsYear +
          ' to ' +
          calendarData.maxBsYear
      )
    }
  },
  validateAdYear: function (adYear: any) {
    if (typeof adYear !== 'number' || adYear === null) {
      throw new TypeError('Invalid parameter adYear value')
    } else if (
      adYear < calendarData.minBsYear - 57 ||
      adYear > calendarData.maxBsYear - 57
    ) {
      throw new RangeError(
        'Parameter adYear value should be in range of ' +
          (calendarData.minBsYear - 57) +
          ' to ' +
          (calendarData.maxBsYear - 57)
      )
    }
  },
  validateBsMonth: function (bsMonth: any) {
    if (typeof bsMonth !== 'number' || bsMonth === null) {
      throw new TypeError('Invalid parameter bsMonth value')
    } else if (bsMonth < 1 || bsMonth > 12) {
      throw new RangeError(
        'Parameter bsMonth value should be in range of 1 to 12'
      )
    }
  },
  validateAdMonth: function (adMonth: any) {
    if (typeof adMonth !== 'number' || adMonth === null) {
      throw new TypeError('Invalid parameter adMonth value')
    } else if (adMonth < 1 || adMonth > 12) {
      throw new RangeError(
        'Parameter adMonth value should be in range of 1 to 12'
      )
    }
  },
  validateBsDate: function (bsDate: any) {
    if (typeof bsDate !== 'number' || bsDate === null) {
      throw new TypeError('Invalid parameter bsDate value')
    } else if (bsDate < 1 || bsDate > 32) {
      throw new RangeError(
        'Parameter bsDate value should be in range of 1 to 32'
      )
    }
  },
  validateAdDate: function (adDate: any) {
    if (typeof adDate !== 'number' || adDate === null) {
      throw new TypeError('Invalid parameter adDate value')
    } else if (adDate < 1 || adDate > 31) {
      throw new RangeError(
        'Parameter adDate value should be in range of 1 to 31'
      )
    }
  },
  validatePositiveNumber: function (numberParameters: any) {
    for (let key in numberParameters) {
      const value = numberParameters[key]
      if (typeof value !== 'number' || value === null || value < 0) {
        throw new ReferenceError(
          'Invalid parameters: ' + Object.keys(numberParameters).join(', ')
        )
      } else if (
        key === 'yearDiff' &&
        value > calendarData.maxBsYear - calendarData.minBsYear + 1
      ) {
        throw new RangeError(
          'Parameter yearDiff value should be in range of 0 to ' +
            (calendarData.maxBsYear - calendarData.minBsYear + 1)
        )
      }
    }
  }
}
export const calendarFunctions = {
  getBsMonthDays: function (bsYear: any, bsMonth: any) {
    validationFunctions.validateRequiredParameters({
      bsYear: bsYear,
      bsMonth: bsMonth
    })
    validationFunctions.validateBsYear(bsYear)
    validationFunctions.validateBsMonth(bsMonth)

    var yearCount = 0
    var totalYears = bsYear + 1 - calendarData.minBsYear
    var bsMonthData = calendarData.extractedBsMonthData[bsMonth - 1]
    for (var i = 0; i < bsMonthData.length; i++) {
      if (bsMonthData[i] === 0) {
        continue
      }

      var bsMonthUpperDaysIndex = i % 2
      yearCount += bsMonthData[i]
      if (totalYears <= yearCount) {
        if (
          (bsYear === 2085 && bsMonth === 5) ||
          (bsYear === 2088 && bsMonth === 5)
        ) {
          return (
            calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] -
            2
          )
        } else {
          return calendarData.bsMonthUpperDays[bsMonth - 1][
            bsMonthUpperDaysIndex
          ]
        }
      }
    }

    return null
  },
  getMonthDaysNumFormMinBsYear: function (bsMonth: any, yearDiff: any) {
    validationFunctions.validateRequiredParameters({
      bsMonth: bsMonth,
      yearDiff: yearDiff
    })
    validationFunctions.validateBsMonth(bsMonth)
    validationFunctions.validatePositiveNumber({ yearDiff: yearDiff })

    var yearCount = 0
    var monthDaysFromMinBsYear = 0
    if (yearDiff === 0) {
      return 0
    }

    var bsMonthData = calendarData.extractedBsMonthData[bsMonth - 1]
    for (var i = 0; i < bsMonthData.length; i++) {
      if (bsMonthData[i] === 0) {
        continue
      }

      var bsMonthUpperDaysIndex = i % 2
      if (yearDiff > yearCount + bsMonthData[i]) {
        yearCount += bsMonthData[i]
        monthDaysFromMinBsYear +=
          calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] *
          bsMonthData[i]
      } else {
        monthDaysFromMinBsYear +=
          calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] *
          (yearDiff - yearCount)
        yearCount = yearDiff - yearCount
        break
      }
    }

    return monthDaysFromMinBsYear
  },
  getTotalDaysNumFromMinBsYear: function (
    bsYear: any,
    bsMonth: any,
    bsDate: any
  ) {
    validationFunctions.validateRequiredParameters({
      bsYear: bsYear,
      bsMonth: bsMonth,
      bsDate: bsDate
    })
    validationFunctions.validateBsYear(bsYear)
    validationFunctions.validateBsMonth(bsMonth)
    validationFunctions.validateBsDate(bsDate)

    if (bsYear < calendarData.minBsYear || bsYear > calendarData.maxBsYear) {
      return null
    }

    var daysNumFromMinBsYear = 0
    var diffYears = bsYear - calendarData.minBsYear
    for (var month = 1; month <= 12; month++) {
      if (month < bsMonth) {
        daysNumFromMinBsYear += calendarFunctions.getMonthDaysNumFormMinBsYear(
          month,
          diffYears + 1
        )
      } else {
        daysNumFromMinBsYear += calendarFunctions.getMonthDaysNumFormMinBsYear(
          month,
          diffYears
        )
      }
    }

    if (bsYear > 2085 && bsYear < 2088) {
      daysNumFromMinBsYear += bsDate - 2
    } else if (bsYear === 2085 && bsMonth > 5) {
      daysNumFromMinBsYear += bsDate - 2
    } else if (bsYear > 2088) {
      daysNumFromMinBsYear += bsDate - 4
    } else if (bsYear === 2088 && bsMonth > 5) {
      daysNumFromMinBsYear += bsDate - 4
    } else {
      daysNumFromMinBsYear += bsDate
    }

    return daysNumFromMinBsYear
  },
  getAdDateByBsDate: function (bsYear: any, bsMonth: any, bsDate: any) {
    validationFunctions.validateRequiredParameters({
      bsYear: bsYear,
      bsMonth: bsMonth,
      bsDate: bsDate
    })
    validationFunctions.validateBsYear(bsYear)
    validationFunctions.validateBsMonth(bsMonth)
    validationFunctions.validateBsDate(bsDate)
    var daysNumFromMinBsYear =
      calendarFunctions.getTotalDaysNumFromMinBsYear(bsYear, bsMonth, bsDate) ||
      0
    var adDate = new Date(
      calendarData.minAdDateEqBsDate.ad.year,
      calendarData.minAdDateEqBsDate.ad.month,
      calendarData.minAdDateEqBsDate.ad.date - 1
    )
    adDate.setDate(adDate.getDate() + daysNumFromMinBsYear)
    return adDate
  },
  getBsDateByAdDate: function (adYear: any, adMonth: any, adDate: any) {
    validationFunctions.validateRequiredParameters({
      adYear: adYear,
      adMonth: adMonth,
      adDate: adDate
    })
    validationFunctions.validateAdYear(adYear)
    validationFunctions.validateAdMonth(adMonth)
    validationFunctions.validateAdDate(adDate)

    var bsYear = adYear + 57
    var bsMonth = (adMonth + 9) % 12
    bsMonth = bsMonth === 0 ? 12 : bsMonth
    var bsDate = 1

    if (adMonth < 4) {
      bsYear -= 1
    } else if (adMonth === 4) {
      var bsYearFirstAdDate = calendarFunctions.getAdDateByBsDate(bsYear, 1, 1)
      if (adDate < bsYearFirstAdDate.getDate()) {
        bsYear -= 1
      }
    }

    var bsMonthFirstAdDate = calendarFunctions.getAdDateByBsDate(
      bsYear,
      bsMonth,
      1
    )
    if (adDate >= 1 && adDate < bsMonthFirstAdDate.getDate()) {
      bsMonth = bsMonth !== 1 ? bsMonth - 1 : 12
      var bsMonthDays = calendarFunctions.getBsMonthDays(bsYear, bsMonth) || 0
      bsDate = bsMonthDays - (bsMonthFirstAdDate.getDate() - adDate) + 1 || 0
    } else {
      bsDate = adDate - bsMonthFirstAdDate.getDate() + 1
    }

    return {
      bsYear: bsYear,
      bsMonth: bsMonth,
      bsDate: bsDate
    }
  },

  getNepaliNumber: function (number: number) {
    var prefixNum: number = Math.floor(number / 10)
    var suffixNum: number = number % 10
    if (prefixNum !== 0) {
      const value: string =
        calendarFunctions.getNepaliNumber(prefixNum) +
        calendarData.nepaliNumbers[suffixNum]
      return value
    } else {
      const value: string = calendarData.nepaliNumbers[suffixNum]
      return value
    }
    return null
  },
  /**
   * Return equivalent number from nepaliNumber
   * @param {String} nepaliNumber
   * @returns {Number} number
   */
  getNumberByNepaliNumber: function (nepaliNumber: any) {
    if (typeof nepaliNumber === 'undefined') {
      throw new Error('Parameter nepaliNumber is required')
    } else if (typeof nepaliNumber !== 'string') {
      throw new Error('Parameter nepaliNumber should be in string')
    }

    var number = 0
    for (var i = 0; i < nepaliNumber.length; i++) {
      var numIndex = calendarData.nepaliNumbers.indexOf(nepaliNumber.charAt(i))
      if (numIndex === -1) {
        throw new Error('Invalid nepali number')
      }
      number = number * 10 + numIndex
    }

    return number
  },
  getBsMonthInfoByBsDate: function (
    bsYear: any,
    bsMonth: any,
    bsDate: any,
    dateFormatPattern: any
  ) {
    validationFunctions.validateRequiredParameters({
      bsYear: bsYear,
      bsMonth: bsMonth,
      bsDate: bsDate
    })
    validationFunctions.validateBsYear(bsYear)
    validationFunctions.validateBsMonth(bsMonth)
    validationFunctions.validateBsDate(bsDate)
    if (dateFormatPattern === null) {
      dateFormatPattern = '%D, %M %d, %y'
    } else if (typeof dateFormatPattern !== 'string') {
      throw new TypeError('Invalid parameter dateFormatPattern value')
    }

    var daysNumFromMinBsYear =
      calendarFunctions.getTotalDaysNumFromMinBsYear(bsYear, bsMonth, bsDate) ||
      0
    var adDate = new Date(
      calendarData.minAdDateEqBsDate.ad.year,
      calendarData.minAdDateEqBsDate.ad.month,
      calendarData.minAdDateEqBsDate.ad.date - 1
    )
    adDate.setDate(adDate.getDate() + daysNumFromMinBsYear)

    var bsMonthFirstAdDate = calendarFunctions.getAdDateByBsDate(
      bsYear,
      bsMonth,
      1
    )
    var bsMonthDays = calendarFunctions.getBsMonthDays(bsYear, bsMonth) || 0
    bsDate = bsDate > bsMonthDays ? bsMonthDays : bsDate
    var eqAdDate = calendarFunctions.getAdDateByBsDate(bsYear, bsMonth, bsDate)
    var weekDay = eqAdDate.getDay() + 1
    var formattedDate = calendarFunctions.bsDateFormat(
      dateFormatPattern,
      bsYear,
      bsMonth,
      bsDate
    )
    return {
      bsYear: bsYear,
      bsMonth: bsMonth,
      bsDate: bsDate,
      weekDay: weekDay,
      formattedDate: formattedDate,
      adDate: eqAdDate,
      bsMonthFirstAdDate: bsMonthFirstAdDate,
      bsMonthDays: bsMonthDays
    }
  },
  getBsYearByAdDate: function (adYear: any, adMonth: any, adDate: any) {
    validationFunctions.validateRequiredParameters({
      adYear: adYear,
      adMonth: adMonth,
      adDate: adDate
    })
    validationFunctions.validateAdYear(adYear)
    validationFunctions.validateAdMonth(adMonth)
    validationFunctions.validateAdDate(adDate)

    var bsDate = calendarFunctions.getBsDateByAdDate(adYear, adMonth, adDate)
    return bsDate.bsYear
  },
  getBsMonthByAdDate: function (adYear: any, adMonth: any, adDate: any) {
    validationFunctions.validateRequiredParameters({
      adYear: adYear,
      adMonth: adMonth,
      adDate: adDate
    })
    validationFunctions.validateAdYear(adYear)
    validationFunctions.validateAdMonth(adMonth)
    validationFunctions.validateAdDate(adDate)

    var bsDate = calendarFunctions.getBsDateByAdDate(adYear, adMonth, adDate)
    return bsDate.bsMonth
  },
  bsDateFormat: function (
    dateFormatPattern: any,
    bsYear: any,
    bsMonth: any,
    bsDate: any
  ) {
    validationFunctions.validateRequiredParameters({
      dateFormatPattern: dateFormatPattern,
      bsYear: bsYear,
      bsMonth: bsMonth,
      bsDate: bsDate
    })
    validationFunctions.validateBsYear(bsYear)
    validationFunctions.validateBsMonth(bsMonth)
    validationFunctions.validateBsDate(bsDate)

    var eqAdDate = calendarFunctions.getAdDateByBsDate(bsYear, bsMonth, bsDate)
    var weekDay = eqAdDate.getDay() + 1
    var formattedDate = dateFormatPattern
    formattedDate = formattedDate.replace(
      /%d/g,
      calendarFunctions.getNepaliNumber(bsDate)
    )
    formattedDate = formattedDate.replace(
      /%y/g,
      calendarFunctions.getNepaliNumber(bsYear)
    )
    formattedDate = formattedDate.replace(
      /%m/g,
      calendarFunctions.getNepaliNumber(bsMonth)
    )
    formattedDate = formattedDate.replace(
      /%M/g,
      calendarData.bsMonths[bsMonth - 1]
    )
    formattedDate = formattedDate.replace(
      /%D/g,
      calendarData.bsDays[weekDay - 1]
    )
    return formattedDate
  },
  parseFormattedBsDate: function (dateFormat: any, dateFormattedText: any) {
    validationFunctions.validateRequiredParameters({
      dateFormat: dateFormat,
      dateFormattedText: dateFormattedText
    })

    var diffTextNum = 0
    var extractedFormattedBsDate: any = {
      bsYear: null,
      bsMonth: null,
      bsDate: null,
      bsDay: null
    }

    for (var i = 0; i < dateFormat.length; i++) {
      if (dateFormat.charAt(i) === '%') {
        var valueOf = dateFormat.substring(i, i + 2)
        var endChar = dateFormat.charAt(i + 2)
        var tempText = dateFormattedText.substring(i + diffTextNum)
        var endIndex =
          endChar !== '' ? tempText.indexOf(endChar) : tempText.length
        var value = tempText.substring(0, endIndex)

        if (valueOf === '%y') {
          extractedFormattedBsDate.bsYear = calendarFunctions.getNumberByNepaliNumber(
            value
          )
          diffTextNum += value.length - 2
        } else if (valueOf === '%d') {
          extractedFormattedBsDate.bsDate = calendarFunctions.getNumberByNepaliNumber(
            value
          )
          diffTextNum += value.length - 2
        } else if (valueOf === '%D') {
          extractedFormattedBsDate.bsDay =
            calendarData.bsDays.indexOf(value) + 1
          diffTextNum += value.length - 2
        } else if (valueOf === '%m') {
          extractedFormattedBsDate.bsMonth = calendarFunctions.getNumberByNepaliNumber(
            value
          )
          diffTextNum += value.length - 2
        } else if (valueOf === '%M') {
          extractedFormattedBsDate.bsMonth =
            calendarData.bsMonths.indexOf(value) + 1
          diffTextNum += value.length - 2
        }
      }
    }

    if (!extractedFormattedBsDate.bsDay) {
      var eqAdDate = calendarFunctions.getAdDateByBsDate(
        extractedFormattedBsDate.bsYear,
        extractedFormattedBsDate.bsMonth,
        extractedFormattedBsDate.bsDate
      )
      extractedFormattedBsDate.bsDay = eqAdDate.getDay() + 1
    }

    return extractedFormattedBsDate
  }
}
