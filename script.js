'use strict'

const week_number_span = document.getElementById('week-number')
const date_span = document.getElementById('date')

/**
 * 주어진 년도가 윤년인지 반환합니다.
 * @param {number} year 
 * @returns {boolean}
 */
function isLeap(year) {
    if (year % 400 == 0) { return true }
    if (year % 100 == 0) { return false }
    if (year % 4 == 0) { return true }
    return false
}

/**
 * 주어진 년도의 마지막 요일을 반환합니다.
 * @param {number} year 
 * @returns {number} [0..6]. 0은 일요일, 6은 토요일.
 */
function pYear(year) {
    return (year + Math.floor(year / 4)
        - Math.floor(year / 100)
        + Math.floor(year / 400)) % 7
}

/**ㅓ
 * 주어진 년도의 마지막 주수를 반환합니다.
 * 
 * 작년이 수요일로 끝나거나, 올해가 목요일로 끝났다면 53을, 그 외에는 52를 반환합니다.
 * Otherwise returns 52.
 * @param {number} year 
 * @returns {52 | 53}
 */
function lastWeek(year) {
    if (pYear(year) == 4 || pYear(year - 1) == 3) {
        return 53
    }
    return 52
}

/**
 * 주어진 날짜가 올해의 몇번째 날인지 반환합니다.
 * @param {Date} date 
 * @returns {number}
 */
function ordinalDays(date) {
    // index 0은 1월 0일의 누적 일수
    const ordinalTable = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]

    if (isLeap(date.getFullYear())) {
        for (const i = 2; i < ordinalTable.length; i++) {
            ordinalTable[i] += 1
        }
    }
    console.log(ordinalTable)

    return ordinalTable[date.getMonth()] + date.getDate()
}

/**
 * 주어진 날의 주수를 반환합니다.
 * @param {Date} date 
 * @returns {number}
 */
function weekNumber(date) {
    const ordinal_days = ordinalDays(date)
    const current_year = date.getFullYear()
    const weekday = date.getDay()
    const week = Math.floor((ordinal_days - weekday + 10) / 7)

    if (week < 1) { return lastWeek(current_year - 1) }
    else if (week > lastWeek(current_year)) { return 1 }
    else { return week }
}

function renderPage(date) {
    const week_number = weekNumber(date)

    week_number_span.innerText = week_number
    date_span.innerText = date.toLocaleString()

    setWaveHeight(getYearPercentage())
}

/**
 * 올해가 지난 정도를 구간 [0, 1]의 숫자로 반환합니다.
 * @returns {number} between [0, 1]
 */
function getYearPercentage() {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 1)
    const end = new Date(now.getFullYear() + 1, 0, 1)

    return (now - start) / (end - start)
}

/**
 * Set the height of the wave in `.box`.
 * @param {number} percentage - between [0, 1]
 */
function setWaveHeight(percentage) {
    const waves = document.getElementsByClassName('waves')[0]
    const waves_percentage = percentage * 110 - 15
    const fill = document.getElementsByClassName('fill')[0]
    // const fill_percentage = (waves_percentage > 0 ? waves_percentage : 0)

    waves.style.bottom = waves_percentage + '%'
    fill.style.top = 100 - waves_percentage + '%'
}

document.addEventListener('DOMContentLoaded', function () {
    const date = new Date()
    renderPage(date)
    setInterval(function () {
        const now = new Date()

        date_span.innerText = now.toLocaleString()
        setWaveHeight(getYearPercentage())

        if (now.getDate != date.getDate) {
            date = now
            renderPage(date)
        }
    }, 1000)
})