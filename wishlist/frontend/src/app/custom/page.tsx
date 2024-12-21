'use client'
import React, { useState, useEffect } from 'react'
import { Calendar, Button, Modal, Form, Input, TimePicker, Popconfirm, message } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import {
  LeftOutlined,
  RightOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import 'tailwindcss/tailwind.css'

// Event and Range Types
type Event = {
  id: string
  title: string
  start: string
  end: string
}

type SelectedRange = {
  start: Dayjs
  end: Dayjs
} | null

const WorkingDaySchedule: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<Dayjs>(dayjs())
  const [events, setEvents] = useState<Event[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [selectedRange, setSelectedRange] = useState<SelectedRange>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isSelecting, setIsSelecting] = useState(false)
  const [showWorkWeekOnly, setShowWorkWeekOnly] = useState(false)

  const handleWeekChange = (direction: 'prev' | 'next') => {
    setCurrentWeek((prev) => prev.add(direction === 'next' ? 7 : -7, 'day'))
  }

  const handleDateSelect = (date: Dayjs) => {
    setCurrentWeek(date.startOf('week'))
    setIsCalendarOpen(false)
  }

  const openModal = (range?: SelectedRange, event?: Event) => {
    if (range) setSelectedRange(range)
    if (event) setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    form.resetFields()
    setSelectedRange(null)
    setSelectedEvent(null)
  }

  const saveEvent = (values: { title: string; timeRange: [Dayjs, Dayjs] }) => {
    const newEvent: Event = {
      id: selectedEvent?.id || dayjs().toISOString(),
      title: values.title,
      start: values.timeRange[0].toISOString(),
      end: values.timeRange[1].toISOString()
    }

    if (selectedEvent) {
      setEvents((prev) => prev.map((e) => (e.id === selectedEvent.id ? newEvent : e)))
      message.success('Event updated successfully!')
    } else {
      setEvents((prev) => [...prev, newEvent])
      message.success('Event added successfully!')
    }
    closeModal()
  }

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
    message.success('Event deleted successfully!')
  }

  const renderWeek = () => {
    const startOfWeek = currentWeek.startOf('week')
    const days = Array.from({ length: showWorkWeekOnly ? 5 : 7 }, (_, i) =>
      startOfWeek.add(i, 'day')
    )

    return (
      <div className="grid grid-cols-8 border-t border-l">
        <div className="border-b border-r p-2">Time</div>
        {days.map((day) => (
          <div key={day.toISOString()} className="border-b border-r p-2 text-center">
            {day.format('MMM DD (ddd)')}
          </div>
        ))}

        {Array.from({ length: 24 * 2 }, (_, i) => (
          <React.Fragment key={i}>
            <div className="border-b border-r p-2">
              {dayjs()
                .startOf('day')
                .add(i * 30, 'minute')
                .format('HH:mm')}
            </div>
            {days.map((day) => {
              const cellStart = day.add(i * 30, 'minute')
              const cellEnd = cellStart.add(30, 'minute')
              const cellEvents = events.filter(
                (event) =>
                  dayjs(event.start).isSame(cellStart, 'minute') ||
                  (dayjs(event.start).isBefore(cellEnd, 'minute') &&
                    dayjs(event.end).isAfter(cellStart, 'minute'))
              )

              return (
                <div
                  key={day.toISOString() + i}
                  className={`border-b border-r p-2 ${isSelecting ? 'bg-blue-200' : 'hover:bg-blue-100'}`}
                  onMouseDown={() => {
                    setIsSelecting(true)
                    setSelectedRange({ start: cellStart, end: cellEnd })
                  }}
                  onMouseUp={() => {
                    setIsSelecting(false)
                    if (selectedRange) openModal(selectedRange)
                  }}>
                  {cellEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-blue-500 text-white text-sm rounded px-1 cursor-pointer mb-1"
                      onClick={() => openModal(null, event)}>
                      {event.title}
                    </div>
                  ))}
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Button icon={<LeftOutlined />} onClick={() => handleWeekChange('prev')} />
        <Button onClick={() => setIsCalendarOpen(!isCalendarOpen)}>Toggle Calendar</Button>
        {isCalendarOpen && (
          <Calendar fullscreen={false} value={currentWeek} onSelect={handleDateSelect} />
        )}
        <Button icon={<RightOutlined />} onClick={() => handleWeekChange('next')} />
      </div>

      <div className="mb-4 flex items-center">
        <Button type="primary" onClick={() => setShowWorkWeekOnly((prev) => !prev)}>
          {showWorkWeekOnly ? 'Show Full Week' : 'Show Work Week'}
        </Button>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>
          Add Event
        </Button>
        {selectedEvent && (
          <>
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => openModal(null, selectedEvent)}>
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete this event?"
              onConfirm={() => deleteEvent(selectedEvent.id)}
              okText="Yes"
              cancelText="No">
              <Button danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </>
        )}
      </div>

      {renderWeek()}

      <Modal
        title={selectedEvent ? 'Edit Event' : 'Add Event'}
        visible={isModalOpen}
        onCancel={closeModal}
        onOk={() => {
          form
            .validateFields()
            .then((values) => saveEvent(values))
            .catch((info) => console.error('Validation Failed:', info))
        }}>
        <Form
          form={form}
          layout="vertical"
          initialValues={
            selectedEvent
              ? {
                  title: selectedEvent.title,
                  timeRange: [dayjs(selectedEvent.start), dayjs(selectedEvent.end)]
                }
              : {}
          }>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the event title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="timeRange"
            label="Time Range"
            rules={[{ required: true, message: 'Please select time range!' }]}>
            <TimePicker.RangePicker
              format="HH:mm"
              minuteStep={30}
              onChange={(times) => {
                if (times?.[0] && !times[1]) {
                  form.setFieldsValue({ timeRange: [times[0], times[0].add(30, 'minute')] })
                }
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default WorkingDaySchedule
