'use strict'

const assert = require('node:assert/strict')
const { test } = require('node:test')
const script = require('./script.js')

test('isLeap: 윤년인 경우 true여야한다', () => {
    for (const [year, expected] of [
        [2023, false], [2024, true], [1900, false],
        [2000, true], [2100, false], [2400, true],
    ]) {
        assert.equal(script.isLeap(year), expected, `${year}년`)
    }
})

test('firstWeekday: 주어진 년도의 첫 요일을 반환해야한다', () => {
    for (let year = 2000; year < 2400; year++) {
        assert.equal(script.firstWeekday(year), new Date(year, 0, 1).getDay(), `${year}년`)
    }
})

test('lastWeek: 연도별 마지막 ISO 주수를 반환해야한다', () => {
    for (const [year, expected] of [
        [2014, 52], [2015, 53], [2016, 52], [2019, 52],
        [2020, 53], [2021, 52], [2024, 52], [2026, 53],
    ]) {
        assert.equal(script.lastWeek(year), expected, `${year}년`)
    }
})

test('ordinalDays: 평년과 윤년의 연중 일수가 맞아야한다', () => {
    for (const [year, days] of [[1900, 365], [2000, 366], [2023, 365], [2024, 366]]) {
        for (let day = 1; day <= days; day++) {
            const date = new Date(year, 0, day)
            assert.equal(script.ordinalDays(date), day, date.toDateString())
        }
    }
})

test('weekNumber: 연말·연초의 ISO 주 경계와 윤일을 처리한다', () => {
    for (const [year, month, day, expected] of [
        [2016, 1, 1, 53], [2016, 1, 3, 53], [2016, 1, 4, 1],
        [2017, 1, 1, 52], [2017, 1, 2, 1],
        [2018, 12, 30, 52], [2018, 12, 31, 1],
        [2020, 12, 31, 53], [2021, 1, 3, 53], [2021, 1, 4, 1],
        [2024, 2, 29, 9], [2024, 12, 29, 52], [2024, 12, 30, 1],
        [2026, 10, 4, 40], [2026, 10, 5, 41], [2026, 10, 6, 41],
    ]) {
        const date = new Date(year, month - 1, day)
        assert.equal(script.weekNumber(date), expected, date.toDateString())
    }
})

test('toPercentage: 소수점 한 자리로 반올림하고 %를 붙여야한다', () => {
    for (const [value, expected] of [
        [0, '0.0%'], [1, '100.0%'], [0.5, '50.0%'],
        [1 / 3, '33.3%'], [2 / 3, '66.7%'],
        [0.1234, '12.3%'], [0.1236, '12.4%'],
    ]) {
        assert.equal(script.toPercentage(value), expected, `${value}`)
    }
})

test('getPercentageOfWeek: 월요일 시작은 0, 일요일 마지막 밀리초는 1이여야한다', () => {
    // 같은 달, 월 경계, 연도 경계를 지나는 주를 확인합니다.
    for (const [year, month, day] of [[2026, 1, 5], [2024, 1, 29], [2025, 12, 29]]) {
        const start = new Date(year, month - 1, day)
        const end = new Date(year, month - 1, day + 6, 23, 59, 59, 999)
        assert.equal(script.getPercentageOfWeek(start), 0, start.toDateString())
        assert.equal(script.getPercentageOfWeek(end), 1, end.toDateString())

        for (const fraction of [0.25, 0.5, 0.75]) {
            const instant = new Date(start.getTime() + Math.floor((end - start) * fraction))
            assert.ok(Math.abs(script.getPercentageOfWeek(instant) - fraction) < 1e-8)
        }
    }
})

test('formatDate: 월요일부터 일요일까지 한국어로 표시해야한다', () => {
    const weekdays = ['월', '화', '수', '목', '금', '토', '일']
    for (const [offset, weekday] of weekdays.entries()) {
        const day = 5 + offset
        assert.equal(script.formatDate(new Date(2026, 9, day)), `2026년 10월 ${day}일 ${weekday}요일`)
    }
    assert.equal(script.formatDate(new Date(2024, 1, 29)), '2024년 2월 29일 목요일')
    assert.equal(script.formatDate(new Date(2026, 0, 1)), '2026년 1월 1일 목요일')
    assert.equal(script.formatDate(new Date(2026, 11, 31)), '2026년 12월 31일 목요일')
})
