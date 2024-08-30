import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"
import { format, addDays, isValid, parseISO } from 'date-fns';

const PeriodCalculator = () => {
  const [lastPeriodStart, setLastPeriodStart] = useState('');
  const [periodDuration, setPeriodDuration] = useState(5);
  const [cycleDuration, setCycleDuration] = useState(28);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const calculateDates = () => {
    const startDate = parseISO(lastPeriodStart);
    if (!isValid(startDate)) {
      alert("Please enter a valid date for your last period start.");
      return;
    }
    setIsLoading(true);
    setShowForm(false);
    
    setTimeout(() => {
      const ovulationDate = addDays(startDate, cycleDuration - 14);
      const nextPeriodStart = addDays(startDate, cycleDuration);
      const nextPeriodEnd = addDays(nextPeriodStart, periodDuration - 1);

      setResults({
        ovulationDate,
        nextPeriodStart,
        nextPeriodEnd,
      });
      setIsLoading(false);
    }, 2000);
  };

  const formatDate = (date) => {
    return isValid(date) ? format(date, 'MMM d') : 'Invalid Date';
  };

  const resetCalculator = () => {
    setResults(null);
    setShowForm(true);
    setLastPeriodStart('');
    setPeriodDuration(5);
    setCycleDuration(28);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      {showForm && (
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
                <Button onClick={() => setPeriodDuration(Math.max(1, periodDuration - 1))} className="bg-[#72035d] hover:bg-[#5c024b] rounded-[25px]">-</Button>
                <Input
                  type="number"
                  id="periodDuration"
                  value={periodDuration}
                  onChange={(e) => setPeriodDuration(parseInt(e.target.value) || 1)}
                  className="text-center"
                />
                <Button onClick={() => setPeriodDuration(periodDuration + 1)} className="bg-[#72035d] hover:bg-[#5c024b] rounded-[25px]">+</Button>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="cycleDuration" className="block text-sm font-medium">
                Average cycle length (days)
              </label>
              <div className="flex items-center space-x-4">
                <Button onClick={() => setCycleDuration(Math.max(1, cycleDuration - 1))} className="bg-[#72035d] hover:bg-[#5c024b] rounded-[25px]">-</Button>
                <Input
                  type="number"
                  id="cycleDuration"
                  value={cycleDuration}
                  onChange={(e) => setCycleDuration(parseInt(e.target.value) || 1)}
                  className="text-center"
                />
                <Button onClick={() => setCycleDuration(cycleDuration + 1)} className="bg-[#72035d] hover:bg-[#5c024b] rounded-[25px]">+</Button>
              </div>
            </div>
            <Button onClick={calculateDates} className="w-full bg-[#72035d] hover:bg-[#5c024b] rounded-[25px]">
              See results
            </Button>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#72035d]"></div>
        </div>
      )}

      {results && !isLoading && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your estimated ovulation date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center">
                {formatDate(results.ovulationDate)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Your estimated period dates are</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center">
                {formatDate(results.nextPeriodStart)} - {formatDate(results.nextPeriodEnd)}
              </div>
            </CardContent>
          </Card>
          <Button onClick={resetCalculator} className="w-full bg-[#72035d] hover:bg-[#5c024b] rounded-[25px]">
            Start over
          </Button>
        </div>
      )}
    </div>
  );
};

export default PeriodCalculator;
