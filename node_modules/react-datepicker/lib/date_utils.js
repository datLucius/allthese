'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSameDay = isSameDay;
exports.isSameUtcOffset = isSameUtcOffset;
exports.isDayInRange = isDayInRange;
exports.isDayDisabled = isDayDisabled;
exports.isTimeDisabled = isTimeDisabled;
exports.isTimeInDisabledRange = isTimeInDisabledRange;
exports.allDaysDisabledBefore = allDaysDisabledBefore;
exports.allDaysDisabledAfter = allDaysDisabledAfter;
exports.getEffectiveMinDate = getEffectiveMinDate;
exports.getEffectiveMaxDate = getEffectiveMaxDate;
exports.parseDate = parseDate;
exports.safeDateFormat = safeDateFormat;
exports.getDayOfWeekCode = getDayOfWeekCode;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isSameDay(moment1, moment2) {
  if (moment1 && moment2) {
    return moment1.isSame(moment2, 'day');
  } else {
    return !moment1 && !moment2;
  }
}

function isSameUtcOffset(moment1, moment2) {
  if (moment1 && moment2) {
    return moment1.utcOffset() === moment2.utcOffset();
  } else {
    return !moment1 && !moment2;
  }
}

function isDayInRange(day, startDate, endDate) {
  var before = startDate.clone().startOf('day').subtract(1, 'seconds');
  var after = endDate.clone().startOf('day').add(1, 'seconds');
  return day.clone().startOf('day').isBetween(before, after);
}

function isDayDisabled(day) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      minDate = _ref.minDate,
      maxDate = _ref.maxDate,
      excludeDates = _ref.excludeDates,
      includeDates = _ref.includeDates,
      filterDate = _ref.filterDate;

  return minDate && day.isBefore(minDate, 'day') || maxDate && day.isAfter(maxDate, 'day') || excludeDates && excludeDates.some(function (excludeDate) {
    return isSameDay(day, excludeDate);
  }) || includeDates && !includeDates.some(function (includeDate) {
    return isSameDay(day, includeDate);
  }) || filterDate && !filterDate(day.clone()) || false;
}

function isTimeDisabled(time, disabledTimes) {
  var l = disabledTimes.length;
  for (var i = 0; i < l; i++) {
    if (disabledTimes[i].get('hours') === time.get('hours') && disabledTimes[i].get('minutes') === time.get('minutes')) {
      return true;
    }
  }

  return false;
}

function isTimeInDisabledRange(time, _ref2) {
  var minTime = _ref2.minTime,
      maxTime = _ref2.maxTime;

  if (!minTime || !maxTime) {
    throw new Error('Both minTime and maxTime props required');
  }

  var base = (0, _moment2.default)().hours(0).minutes(0).seconds(0);
  var baseTime = base.clone().hours(time.get('hours')).minutes(time.get('minutes'));
  var min = base.clone().hours(minTime.get('hours')).minutes(minTime.get('minutes'));
  var max = base.clone().hours(maxTime.get('hours')).minutes(maxTime.get('minutes'));

  return !(baseTime.isSameOrAfter(min) && baseTime.isSameOrBefore(max));
}

function allDaysDisabledBefore(day, unit) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      minDate = _ref3.minDate,
      includeDates = _ref3.includeDates;

  var dateBefore = day.clone().subtract(1, unit);
  return minDate && dateBefore.isBefore(minDate, unit) || includeDates && includeDates.every(function (includeDate) {
    return dateBefore.isBefore(includeDate, unit);
  }) || false;
}

function allDaysDisabledAfter(day, unit) {
  var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      maxDate = _ref4.maxDate,
      includeDates = _ref4.includeDates;

  var dateAfter = day.clone().add(1, unit);
  return maxDate && dateAfter.isAfter(maxDate, unit) || includeDates && includeDates.every(function (includeDate) {
    return dateAfter.isAfter(includeDate, unit);
  }) || false;
}

function getEffectiveMinDate(_ref5) {
  var minDate = _ref5.minDate,
      includeDates = _ref5.includeDates;

  if (includeDates && minDate) {
    return _moment2.default.min(includeDates.filter(function (includeDate) {
      return minDate.isSameOrBefore(includeDate, 'day');
    }));
  } else if (includeDates) {
    return _moment2.default.min(includeDates);
  } else {
    return minDate;
  }
}

function getEffectiveMaxDate(_ref6) {
  var maxDate = _ref6.maxDate,
      includeDates = _ref6.includeDates;

  if (includeDates && maxDate) {
    return _moment2.default.max(includeDates.filter(function (includeDate) {
      return maxDate.isSameOrAfter(includeDate, 'day');
    }));
  } else if (includeDates) {
    return _moment2.default.max(includeDates);
  } else {
    return maxDate;
  }
}

function parseDate(value, _ref7) {
  var dateFormat = _ref7.dateFormat,
      locale = _ref7.locale;

  var m = (0, _moment2.default)(value, dateFormat, locale || _moment2.default.locale(), true);
  return m.isValid() ? m : null;
}

function safeDateFormat(date, _ref8) {
  var dateFormat = _ref8.dateFormat,
      locale = _ref8.locale;

  return date && date.clone().locale(locale || _moment2.default.locale()).format(Array.isArray(dateFormat) ? dateFormat[0] : dateFormat) || '';
}

var dayOfWeekCodes = {
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
  7: 'sun'
};

function getDayOfWeekCode(day) {
  return dayOfWeekCodes[day.isoWeekday()];
}
