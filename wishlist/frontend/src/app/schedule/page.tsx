'use client'
import dayjs, { Dayjs } from 'dayjs'
import React, { useState } from 'react'
import 'tailwindcss/tailwind.css'
import isBetween from 'dayjs/plugin/isBetween' // ES 2015
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter' // ES 2015
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)
dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

const workingDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const isWorkingDay = (day: Dayjs) => workingDays.includes(day.format('ddd'))

const getWorkingDaysOfWeek = (week: Dayjs): Array<Dayjs> => {
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => week.add(i, 'day'))
  const workingDaysOfWeek = daysOfWeek.filter((day) => isWorkingDay(day))
  return workingDaysOfWeek
}

const startTime = dayjs().hour(8).minute(0).second(0)
const endTime = dayjs().hour(18).minute(0).second(0)
const generateTimeSlots = (startTime: Dayjs, endTime: Dayjs, minutesUnit: number) => {
  const totalSlots = endTime.diff(startTime, 'minute') / minutesUnit // 計算總時段數
  const timeSlots = Array.from({ length: totalSlots }, (_, index) =>
    startTime.add(index * minutesUnit, 'minute').format('HH:mm')
  )
  return timeSlots
}

type Event = {
  start: Dayjs // HH:mm 格式
  end: Dayjs // HH:mm 格式
  date: Dayjs // yyyy/mm/dd 格式
  name: string // 事件名稱
}

type DayEvents = {
  [date: string]: Event[]
}

const events: Event[] = [
  {
    start: dayjs('09:30', 'HH:mm'),
    end: dayjs('12:00', 'HH:mm'),
    date: dayjs('2024/12/23', 'YYYY/MM/DD'),
    name: '洗衣服'
  },
  {
    start: dayjs('12:30', 'HH:mm'),
    end: dayjs('14:00', 'HH:mm'),
    date: dayjs('2024/12/23', 'YYYY/MM/DD'),
    name: '打掃'
  },
  {
    start: dayjs('08:30', 'HH:mm'),
    end: dayjs('09:30', 'HH:mm'),
    date: dayjs('2024/12/23', 'YYYY/MM/DD'),
    name: '運動'
  },
  {
    start: dayjs('15:00', 'HH:mm'),
    end: dayjs('16:00', 'HH:mm'),
    date: dayjs('2024/12/27', 'YYYY/MM/DD'),
    name: '會議'
  }
]

const getGroupEvents = (events: Event[]): DayEvents => {
  const grouped: DayEvents = {}
  events.forEach((event) => {
    if (!Object.hasOwn(grouped, event.date.toISOString())) {
      grouped[event.date.toISOString()] = []
    }
    grouped[event.date.toISOString()].push(event)
  })

  for (const date in grouped) {
    grouped[date].sort((a, b) => {
      const startA = a.start.toISOString().split(':').map(Number)
      const startB = b.start.toISOString().split(':').map(Number)
      return startA[0] - startB[0] || startA[1] - startB[1]
    })
  }
  console.log(grouped)
  return grouped
}

export default function CourseSchedule() {
  const [currentWeek, setCurrentWeek] = useState<Dayjs>(dayjs())

  const startOfWeek = currentWeek.startOf('week')
  const workingDays = getWorkingDaysOfWeek(startOfWeek)

  const groupEvents = getGroupEvents(events)

  const renderDayEvent = (day: Dayjs) => {
    const endDay = dayjs('18:00', 'HH:mm')
    const stringDay = day.toISOString()
    const dayEvents = []

    // This day has events
    if (Object.hasOwn(groupEvents, stringDay)) {
      // get the event list of this day
      const eventList = groupEvents[stringDay]
      let timeslot = dayjs('08:00', 'HH:mm')

      while (timeslot.isBefore(endDay)) {
        // check the timeslot with event or not

        const event = eventList.find((event) => event.start.toString() === timeslot.toString())
        if (event) {
          const number = dayjs(event.end).diff(dayjs(event.start), 'minute') / 30
          // TDD: I have no idea why tailwind not working
          // dayEvents.push(<div className={`row-span-${number} content-center`}>{event.name}</div>)
          dayEvents.push(
            <div
              key={event.start.toISOString()}
              style={{ gridRow: `span ${number} / span ${number}` }}
              className="content-center">
              {event.name}
            </div>
          )
          timeslot = dayjs(event.end, 'HH:mm')
        } else {
          dayEvents.push(<div key={timeslot.toISOString()} className="row-span-1"></div>)
          timeslot = timeslot.add(30, 'minute')
        }
      }
    } else {
      for (
        let timeslot = dayjs('08:00', 'HH:mm');
        timeslot.isBefore(endDay);
        timeslot = timeslot.add(30, 'minute')
      ) {
        dayEvents.push(<div key={timeslot.toISOString()} className="row-span-1"></div>)
      }
    }

    return dayEvents
  }

  return (
    <div id="container" className="select-none h-full flex justify-center items-center">
      <div
        id="schedule"
        // TODO: grid-rows-[timeslot + 1], grid-cols-[days + 1]
        className="h-4/5 w-3/4 border border-slate-400 grid grid-rows-21 grid-cols-6 divide-x">
        <div className="row-span-21 grid grid-rows-21 text-center divide-y content-center">
          <div className="content-center">Time</div>
          {generateTimeSlots(startTime, endTime, 30).map((timeSlot, i) => {
            return (
              <div key={i} id="time-slot" className="content-center">
                {timeSlot}
              </div>
            )
          })}
        </div>

        {workingDays.map((day) => {
          return (
            <div
              key={day.toISOString()}
              className="row-span-21 grid grid-rows-21 text-center divide-y content-center">
              <div className="content-center" key={day.toISOString()}>
                {day.format('MM/DD')}
              </div>
              {renderDayEvent(day)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
