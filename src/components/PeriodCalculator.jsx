import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"
import { format, addDays } from 'date-fns';

const PeriodCalculator = () => {
  const [lastPeriodStart, setLastPeriodStart] = useState('');
  const [periodDuration, setPeriodDuration] = useState(5);
  const [cycleDuration, setCycleDuration] = useState(28);
  const [results, setResults] = useState(null);

  const calculateDates = () => {
    const startDate = new Date(lastPeriodStart);
    const ovulationDate = addDays(startDate, cycleDuration - 14);
    const nextPeriodStart = addDays(startDate, cycleDuration);
    const nextPeriodEnd = addDays(nextPeriodStart, periodDuration - 1);

    setResults({
      ovulationDate,
      nextPeriodStart,
      nextPeriodEnd,
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Period Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="lastPeriodStart" className="block text-sm font-medium">
              When did your last period start?
            </label>
            <div className="relative">
              <Input
                type="date"
                id="lastPeriodStart"
                value={lastPeriodStart}
                onChange={(e) => setLastPeriodStart(e.target.value)}
                className="pl-10"
              />
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="periodDuration" className="block text-sm font-medium">
              How many days did it last?
            </label>
            <div className="flex items-center space-x-4">
              <Button onClick={() => setPeriodDuration(Math.max(1, periodDuration - 1))}>-</Button>
              <Input
                type="number"
                id="periodDuration"
                value={periodDuration}
                onChange={(e) => setPeriodDuration(parseInt(e.target.value))}
                className="text-center"
              />
              <Button onClick={() => setPeriodDuration(periodDuration + 1)}>+</Button>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="cycleDuration" className="block text-sm font-medium">
              Average cycle length (days)
            </label>
            <div className="flex items-center space-x-4">
              <Button onClick={() => setCycleDuration(Math.max(1, cycleDuration - 1))}>-</Button>
              <Input
                type="number"
                id="cycleDuration"
                value={cycleDuration}
                onChange={(e) => setCycleDuration(parseInt(e.target.value))}
                className="text-center"
              />
              <Button onClick={() => setCycleDuration(cycleDuration + 1)}>+</Button>
            </div>
          </div>
          <Button onClick={calculateDates} className="w-full bg-pink-500 hover:bg-pink-600">
            See results
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your estimated ovulation date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center">
                {format(results.ovulationDate, 'MMM')}
                <br />
                {format(results.ovulationDate, 'd')}
              </div>
              <Button className="w-full mt-4 bg-pink-500 hover:bg-pink-600">
                Track your periods
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Your estimated period dates are</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center">
                {format(results.nextPeriodStart, 'MMM')}-{format(results.nextPeriodEnd, 'MMM')}
                <br />
                {format(results.nextPeriodStart, 'd')}-{format(results.nextPeriodEnd, 'd')}
              </div>
              <Button className="w-full mt-4 bg-pink-500 hover:bg-pink-600">
                Track your periods
              </Button>
            </CardContent>
          </Card>
          <Button onClick={() => setResults(null)} className="w-full">
            Start over
          </Button>
        </div>
      )}
    </div>
  );
};

export default PeriodCalculator;