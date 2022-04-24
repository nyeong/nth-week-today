// image ratio: 2:1
const { createCanvas, registerFont } = require('canvas')
const fs = require('fs')
const width = 800
const height = 400
const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')
const weekday = process.argv[2] ? process.argv[2] : 0
const title = `오늘은 올해의
${weekday}번째 주입니다!`

const palette = {
  background: "#0fb9b1",
  fontFamily: "SpoqaHanSansNeo-Medium.otf",
  fontSize: 48,
}

context.fillStyle = palette.background
context.fillRect(0, 0, width, height)

registerFont('./vendor/SpoqaHanSansNeo-Medium.otf', {
  family: palette.fontFamily
})
context.font = `normal ${palette.fontSize}pt ${palette.fontFamily}`
context.textAlign = "center"
context.fillStyle = "white"
context.fillText(title, width / 2, height * 0.45)

const buffer = canvas.toBuffer('image/png')
fs.writeFileSync(`./dest/cover-W${weekday}.jpg`, buffer)

