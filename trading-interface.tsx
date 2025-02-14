"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Date array
const dateArray = ["24-Apr-2024", "02-May-2024", "09-May-2024", "31-May-2024", "21-Jun-2024"]

// Strategy array (your provided data)
const strategyArray = [
  {
    View: "Bullish",
    Value: {
      "24-Apr-2024": [
        "Bull Call Spread",
        "Bull Put Spread",
        "Bull Put Spread",
        "Long Call",
        "Bull Put Spread",
        "Bull Call Spread",
        "Strategy1",
        "Bull Call Spread",
        "Strategy1",
        "Strategy1",
        "SpreadStrategy",
        "Bull Call Spread",
      ],
      "02-May-2024": [
        "Bull Call Spread",
        "Bull Call Spread",
        "Bull Put Spread",
        "Long Call",
        "Long Call",
        "Long Call",
        "Bull Put Spread",
        "Bull Call Spread",
        "Strategy1",
        "Bull Call Spread",
        "Strategy2",
        "Strategy1",
        "Strategy2",
        "Bull Call Spread",
      ],
      "09-May-2024": ["Strategy Put", "Strategy Call", "Strategy Call", "Strategy Call", "Strategy Put"],
    },
  },
  {
    View: "Bearish",
    Value: {
      "24-Apr-2024": [
        "Bear Call Spread",
        "Bear Call Spread",
        "Bear Call Spread",
        "Long Put",
        "Long Put",
        "Long Put",
        "Bear Call Spread",
      ],
      "31-May-2024": ["Long Put", "Long Put", "Long Put", "Long Put", "Long Put"],
      "21-Jun-2024": ["Strategy3", "Strategy3", "Bear Put Spread", "Strategy3", "Long Put", "Long Put"],
    },
  },
  {
    View: "RangeBound",
    Value: {
      "24-Apr-2024": [
        "Short Straddle",
        "Short Strangle",
        "Short Strangle",
        "Iron Butterfly",
        "Short Strangle",
        "Short Straddle",
        "Strategy1",
        "Short Straddle",
        "Strategy1",
        "Strategy1",
        "SpreadStrategy",
        "Short Straddle",
      ],
      "02-May-2024": [
        "Short Straddle",
        "Short Straddle",
        "Short Strangle",
        "Iron Butterfly",
        "Iron Butterfly",
        "Iron Butterfly",
        "Short Strangle",
        "Short Straddle",
        "Strategy1",
        "Short Straddle",
        "Strategy2",
        "Strategy1",
        "Strategy2",
        "Short Straddle",
      ],
      "21-Jun-2024": ["Iron Condor", "Iron Butterfly", "Iron Butterfly", "Iron Butterfly", "Iron Condor"],
    },
  },
  {
    View: "Volatile",
    Value: {
      "02-May-2024": [
        "Long Straddle",
        "Long Strangle",
        "Long Strangle",
        "Long Strangle",
        "Long Straddle",
        "Strategy1",
        "Long Straddle",
        "Strategy1",
        "Strategy1",
        "Spread-Strategy",
        "Long Straddle",
      ],
      "09-May-2024": [
        "Long Straddle",
        "Long Straddle",
        "Long Strangle",
        "Long Strangle",
        "Long Straddle",
        "Strategy1",
        "Long Straddle",
        "Strategy2",
        "Strategy1",
        "Strategy2",
        "Long Straddle",
      ],
      "31-May-2024": ["Long Straddle", "Long Strangle", "Long Strangle", "Long Strangle", "Long Straddle"],
    },
  },
]

export default function TradingInterface() {
  const [selectedSentiment, setSelectedSentiment] = useState("Bearish")
  const [selectedDate, setSelectedDate] = useState(dateArray[0])
  const [strategies, setStrategies] = useState<{ [key: string]: number }>({})

  const sentiments = ["Bullish", "Bearish", "RangeBound", "Volatile"]

  useEffect(() => {
    updateStrategies()
  }, [selectedSentiment]) //Fixed useEffect dependency

  const updateStrategies = () => {
    const sentimentData = strategyArray.find((item) => item.View === selectedSentiment)
    if (sentimentData && sentimentData.Value[selectedDate]) {
      const strategyCount = sentimentData.Value[selectedDate].reduce(
        (acc, strategy) => {
          acc[strategy] = (acc[strategy] || 0) + 1
          return acc
        },
        {} as { [key: string]: number },
      )
      setStrategies(strategyCount)
    } else {
      setStrategies({})
    }
  }

  const getAvailableDates = () => {
    const sentimentData = strategyArray.find((item) => item.View === selectedSentiment)
    return dateArray.filter((date) => sentimentData?.Value[date])
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      {/* Sentiment Toggle */}
      <div className="flex gap-4 bg-gray-50 p-2 rounded-xl">
        {sentiments.map((sentiment) => (
          <button
            key={sentiment}
            onClick={() => {
              setSelectedSentiment(sentiment)
              setSelectedDate(getAvailableDates()[0])
            }}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedSentiment === sentiment ? "bg-blue-600 text-white" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {sentiment}
          </button>
        ))}
      </div>

      {/* Date Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-full flex items-center justify-between p-4 rounded-xl border text-left hover:bg-gray-50 transition-colors">
            <span className="text-lg font-medium">{selectedDate}</span>
            <ChevronDown className="h-5 w-5 text-blue-600" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          {getAvailableDates().map((date) => (
            <DropdownMenuItem key={date} onClick={() => setSelectedDate(date)} className="cursor-pointer">
              {date}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Strategy List */}
      <div className="space-y-3">
        {Object.entries(strategies).map(([strategy, count]) => (
          <button
            key={strategy}
            className="w-full flex items-center justify-between p-4 rounded-xl border hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg font-medium">{strategy}</span>
            <span className="text-gray-400">
              {count} {count === 1 ? "Strategy" : "Strategies"}
            </span>
          </button>
        ))}
        {Object.keys(strategies).length === 0 && (
          <div className="text-center text-gray-400 py-4">No strategies available for this date</div>
        )}
      </div>
    </div>
  )
}

