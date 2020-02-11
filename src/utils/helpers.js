import moment from "moment";

const VOID_BET = 5000
const REJECTED_BET = 6000

const GAMES = 3
const LIVE_CASINO = 4

export function getLocalStorageKey(keyString) {
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf(keyString) !== -1) {
            return localStorage.key(i);
        }
    }
}

/**
    * Navigate to the Some Page
    * Accept url as parameter
*/
export const navigateToPage = (url) => {
    const redirect = (url) ? `/${url}` : '/'
    window.location.href = redirect
}

/**
    Capitalize first letter
*/
export const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
    tolowercase
*/
export const ToLowerCase = (str) => {
    return str.toLowerCase()
}

/**
    Get first word from string
*/
export const getFirstWord = (str) => {
    const firstWord = str.split(' ')
    return firstWord[0]
}

export const getString = (str, int) => {
    const firstWord = str.split(' ')
    return firstWord[int]
}
/**
    Parse number
*/
export const parseNumber = (int) => {
    return parseInt(int)
}

/**
    Sum up two value
*/
export const addTwoValue = (numberOne, numberTwo) => {
    return (numberOne && numberTwo) ? Number(numberOne) + Number(numberTwo) : 0
}

/**
    Subtract up two value
*/
export const subtractTwoValue = (numberOne, numberTwo) => {
    return (numberOne && numberTwo) ? Number(numberOne) - Number(numberTwo) : 0
}

/**
    This will accept numbers only
 */
export const NumbersOnly = (event) => {
    const keyCode = event.keyCode || event.which
    const keyValue = String.fromCharCode(keyCode)
    if (/\+|-/.test(keyValue))
        event.preventDefault()
}

/**
    Replace spaces to underscore, and lowercase
 */
export const spaceToUnderscore = (str) => {
    return str.split(' ').join('_').toLowerCase()
}

/**
    remove space
 */
export const removeSpace = (str) => {
    return str.split(' ').join('').toLowerCase()
}

/**
    split item
 */
export const splitItems = (str, no) => {
    return (str) ? str.split('_')[no] : 0
}

export const ternaryOps = (value) => {
    return (value !== undefined || value !== null) ? value : null
}

export const hypenToUnderscore = (str) => {
    return (str) ? str.split('-').join('_').toLowerCase() : 0
}

/**
    Usert type convertion
 */
export const getUserType = (userType) => {
    let userTypeId = 10
    if (userType === 'agent' || userType === 10) userTypeId = 10
    else if (userType === 'subagent' || userType === 20) userTypeId = 20
    else if (userType === 'member' || userType === 30) userTypeId = 30
    return userTypeId
}

/**
 * Date conversation
 */
export const convertDate = (date, type, format = 'YYYY/MM/DD h:mm:ss A') => {

    if (date === null || date === undefined) {
        return date
    }

    let utcDate = moment.utc(date).format();

    let utcMinus4Date = moment.utc(utcDate).add(-4, "hours").format(format)

    return type === 'utc' ? utcDate : utcMinus4Date
}


export const convertDate3 = (date) => {

    if (date === null || date === undefined) {
        return date
    }

    let utcDate = moment.utc(date).format();

    let utcMinus4Date = moment.utc(utcDate).add(-4, "hours");

    return utcMinus4Date;
}

export const convertDate2 = (date, type, format = 'YYYY/MM/DD h:mm:ss A') => {

    if (date === null || date === undefined) {
        return date
    }

    let utcDate = moment.utc(date).format();

    let localDate = moment(utcDate).local().format(format);

    return type === 'utc' ? utcDate : localDate
}


export const getUrl = (val) => {
    return window.location[val]
}

export const getUrlCurrenLocation = () => {
    let pathname = getUrl('pathname')
    let paths = pathname.split('/')
    return paths[paths.length - 1]
}

export const formatCurrency = (value) => {

    let newValue = 0.00;

    if (!isNaN(value)) {
        newValue = getFixedDecimal(value, 2)
        newValue = newValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return !isNaN(value) ? newValue : value
}

export const getAbsoluteValue = (value) => {
    return value ? Math.abs(value) : 0
}

export const formatCurrency4DecimalPlaces = (value) => {

    let newValue = 0.00;

    if (!isNaN(value)) {
        newValue = getFixedDecimal(value, 3)
        newValue = newValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return !isNaN(value) ? newValue : value
}


export const formatDecimal = (value) => {
    let newValue = 0.00;

    if (!isNaN(value)) {
        newValue = getFixedDecimal(value, 2)
    }

    return !isNaN(value) ? newValue : value
}

export const formatDecimal4DecimalPlaces = (value) => {
    let newValue = 0.00;

    if (!isNaN(value)) {
        newValue = getFixedDecimal(value, 4)
    }

    return !isNaN(value) ? newValue : value
}

const truncateToDecimals = (num, dec = 2) => {
    return parseFloat(Math.round(num * 1000) / 1000)
}


Number.prototype.countDecimals = function () {
    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0;
}


export const convertOdds = (odds, type) => {
    if (type === 'Decimal') {
        return getFixedDecimal(odds, 2)
    } else if (type === 'Malaysian') {
        if (odds <= 2) {
            return getFixedDecimal((odds - 1), 2)
        } else if (odds > 2) {
            return getFixedDecimal((-1 / (odds - 1)), 2)
        } else {
            return odds;
        }
    } else if (type === 'HongKong') {
        return getFixedDecimal((odds - 1), 2);
    } else if (type === 'None' || type === 'Indonesia' || type === 'Indonesian') {
        if (odds >= 2) {
            return getFixedDecimal((odds - 1), 2)
        } else if (odds < 2) {
            return getFixedDecimal((-1 / (odds - 1)), 2)
        } else {
            return odds;
        }
    } else {
        return getFixedDecimal(odds, 2)
    }
}


export const convertOddsToFixed = (odds, type = 'Decimal') => {
    let convertedOdds = 0
    if (type === 'Decimal') {
        convertedOdds = Number(odds).toFixed(2)
        convertedOdds = convertedOdds + ''
        return convertedOdds
    } else if (type === 'Malaysian') {
        if (odds <= 2) {
            convertedOdds = (odds - 1).toFixed(2)
            convertedOdds = convertedOdds + ''
            return convertedOdds
        } else if (odds > 2) {
            return (-1 / (odds - 1)).toFixed(2)
        } else {
            convertedOdds = Number(odds).toFixed(2)
            convertedOdds = convertedOdds + ''
            return convertedOdds
        }
    } else if (type === 'HongKong') {
        convertedOdds = (odds - 1).toFixed(2)
        return convertedOdds;
    } else if (type === 'None' || type === 'Indonesia' || type === 'Indonesian') {
        if (odds >= 2) {
            convertedOdds = (odds - 1).toFixed(2)
            convertedOdds = convertedOdds + ''
            return convertedOdds
        } else if (odds < 2) {
            return (-1 / (odds - 1)).toFixed(2)
        } else {
            convertedOdds = Number(odds).toFixed(2)
            convertedOdds = convertedOdds + ''
            return convertedOdds
        }
    }
}


export const convertToFixed = (value) => {
    let convertedValue = Number(value).toFixed(2)
    convertedValue = convertedValue + ''
    return convertedValue
}


export const convertOddsType = (type = 'Decimal') => {
    if (type === 'Decimal') {
        return "DEC"
    } else if (type === 'Malaysian') {
        return "MY"
    } else if (type === 'HongKong') {
        return "HK"
    } else if (type === 'None' || type === 'Indonesia' || type === 'Indonesian') {
        return "INDO"
    }
}



export const getFixedDecimal = (num, fixed) => {
    let isNotValid = num === '' || num == null || num === 'undefined' || num === 'null'
    let tcNumber = isNotValid ? 0 : num
    // eslint-disable-next-line no-useless-escape
    let re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    let fd = re ? Number(tcNumber.toString().match(re)[0]) : 0;
    return addZeroes(fd);
}



export const addZeroes = (value) => {
    //set everything to at least two decimals; removs 3+ zero decimasl, keep non-zero decimals
    let new_value = value * 1; //removes trailing zeros
    new_value = new_value + ''; //casts it to string

    let pos = new_value.indexOf('.');
    if (pos === -1) new_value = new_value + '.00';
    else {
        let integer = new_value.substring(0, pos);
        let decimals = new_value.substring(pos + 1);
        while (decimals.length < 2) decimals = decimals + '0';
        new_value = integer + '.' + decimals;
    }
    return new_value;
}


export const isPositive = (number) => {
    return number >= 0 || isNaN(number)
}

export const getCurrencyCodeValue = (country) => {
    switch (country) {
        case 'USD':
            return 1
        case 'EUR':
            return 2
        case 'GBP':
            return 3
        case 'KRW':
            return 4
        case 'VND':
            return 5
        case 'THB':
            return 6
        case 'CNY':
            return 7
        case 'MYR':
            return 8
        case 'KHR':
            return 9
        case 'IDR':
            return 10
        case 'INR':
            return 11
        case 'JPY':
            return 12
        default:
            return null
    }
}


export const getSportsIcon = (sportId) => {
    switch (sportId) {
        case 1:
            return "soccer"
        case 2:
            return "basketball"
        case 3:
            return "baseball"
        case 4:
            return "icehockey"
        case 5:
            return "tennis"
        case 6:
            return "handball"
        case 7:
            return "floorball"
        case 8:
            return "trotting"
        case 9:
            return "golf"
        case 10:
            return "boxing"
        case 11:
            return "motorsports"
        case 12:
            return "rugby"
        case 13:
            return "aussieRules"
        case 16:
            return "americanfootball"
        case 20: //tabletennis
            return "tabletennis"
        case 21:
            return "cricket"
        case 23:
            return "volleyball"
        case 31:
            return "badminton"
        case 107:
            return "esports"
        case 109: //counterstrike
            return "counterstrike"
        case 110: //leagueOfLegends
            return "leagueoflegends"
        case 111: //dota2
            return "dota2"
        case 1000:
            return "virtualsports"
        case 2000:
            return "casino"
        default:
            return "allsports"
    }
}


export const getOtherProductsIcon = (otherProductId) => {
    switch (otherProductId) {
        case 1000:
            return "virtualsportsnav"
        case 2000:
            return "gamenav"
        case 3000:
            return "livecasinonav"
        default:
            return "allsports"
    }
}


export const getMarketDisplayByMarketTemplateId = (marketTemplateId) => {
    switch (marketTemplateId) {
        case 1:
            return "Full Time / Match Winner"
        case 2:
            return "Full Time / Handicap"
        case 3:
            return "Full Time / Over/Under"
        case 8:
            return "Half Time / Match Winner"
        case 9:
            return "Half Time / Handicap"
        case 10:
            return "Half Time / Over/Under"
        default:
            return ""
    }
}

export const getMarketScopeAbbreviation = (scope) => {
    switch (scope) {
        case "Full Time":
            return "FT"
        case "Half Time":
            return "HT"
        default:
            return ""
    }
}

export const hasNoLine = (marketTemplateId) => {
    //basketball/soccer - 1, 8
    //baseball 41 -
    //ice hockey - 35, 38
    //tennis - 24
    //golf - 56
    //aussie rules - 24, 48??? draw no bet
    //american football - 48, 47
    //table tennis - 24
    //volleyball - 24, 30 Set (x) - winner
    //badminton - 24, 46 - xth game - winner
    //CS109 - 24, 54//xth map - winner (incl. overtime)
    //LOL 110 - 24, 51 xth map winner
    //Dota - 24 , 51
    return [1, 8, 24, 30, 35, 38, 46, 47, 41, 48, 51, 54, 56].includes(marketTemplateId);
}

export const isBinaryVirtualSports = (marketTemplateId, marketName, line) => {

    if (marketTemplateId !== 9999) {
        return false
    }

    let binaryVirtualSportsMarkets = ["1st half - handicap", "Handicap"]
    if (line !== 0) {
        return true
    }
    else if (binaryVirtualSportsMarkets.includes(marketName) && line === 0) {
        return true
    } else if (line === 0) {
        return false
    }
}

export const notConvertibleToOtherOdds = (marketTemplateId) => {
    return [1, 8].includes(marketTemplateId);
}


export const phoneRegex = new RegExp('^((([0-9]+))|([0-9]+))[-\s\.]?[0-9]+[-\s\.]?[0-9]+$')

export const emailRegex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;

export const usernameRegex = /^[a-zA-Z0-9]*((-|\s)*[_a-zA-Z0-9-])*$/

export const nameRegex = new RegExp('^[a-zA-Z0-9][-a-zA-Z0-9\.-\\s]*$')


export const letterRegex = /^[a-zA-Z]/

export const specialCharacterRegex = /[`~!@#$%^&*()_|+\=?;:'",<>\{\}\[\]\\\/]/gi

export const negativeRegex = /\-/

export const debounce = (func, wait, immediate) => {
    let timeout;
    return function () {
        let context = this, args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


export const isRejectedCancelledOrVoid = (statusId) => {
    return [VOID_BET, REJECTED_BET].includes(statusId)
}

export const isNullOrUndefined = (item) => {
    return item === null || item === undefined
}

export const isGamesOrLiveCasino = (productId) => {
    return [GAMES, LIVE_CASINO].includes(productId)
}