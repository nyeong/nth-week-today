# nth-week-today

> 오늘은 올해의 **몇 번째 주**인가요?

이 웹페이지는 [ISO 8601](https://en.wikipedia.org/wiki/ISO_week_date)에 따라 오늘이 올해의 몇 번째 주인지 알려줍니다. BBQ 하위팀!

## 올해의 첫주는 언제부터인가요?

> The ISO 8601 definition for week 01 is the week with the Gregorian year's first Thursday in it. 
> [ISO_week_date#First_week@Wikipedia](https://en.wikipedia.org/wiki/ISO_week_date#First_week)

ISO 8601의 정의에 의하면 01번째 주는 그레고리력에서 첫번째 목요일이 있는 주입니다. 따라서 1월 1일이 금, 토, 일요일이라면 그 해의 첫주는 다음주가 됩니다.

```
|Mon|Tue|Wed|Thu|Fri|Sat|Sun|
-----------------------------
|  1|  2|  3|  4|  5|  6|  7| <- 올해의 첫주
|  8|  9| 10| 11| 12| 13| 14|


|Mon|Tue|Wed|Thu|Fri|Sat|Sun|
-----------------------------
| 29| 30| 31|  1|  2|  3|  4| <- 올해의 첫주
|  5|  6|  7|  8|  9| 10| 11|


|Mon|Tue|Wed|Thu|Fri|Sat|Sun|
-----------------------------
| 28| 29| 30| 31|  1|  2|  3| <- 작년의 53번째 주
|  4|  5|  6|  7|  8|  9| 10| <- 올해의 첫주
```

Weeks per year
The long years, with 53 weeks in them, can be described by any of the following equivalent definitions:

any year starting on Thursday (dominical letter D or DC) and any leap year starting on Wednesday (ED)
any year ending on Thursday (D, ED) and any leap year ending on Friday (DC)
years in which 1 January and 31 December (in common years) or either (in leap years) are Thursdays