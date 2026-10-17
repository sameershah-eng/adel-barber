import { useState, useEffect } from 'react';
import { businessData } from '../data/business';
import { BusinessHoursDay } from '../types';

export interface BusinessStatus {
  isOpen: boolean;
  statusBadgeText: string;
  subText: string;
  currentDayIndex: number;
  todayHours: BusinessHoursDay | undefined;
  currentTimeLondon: string;
}

export function useBusinessHours(): BusinessStatus {
  const [status, setStatus] = useState<BusinessStatus>(() => calculateStatus());

  function calculateStatus(): BusinessStatus {
    const now = new Date();

    // Format current time in Europe/London timezone
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const parts = formatter.formatToParts(now);
    const weekdayStr = parts.find((p) => p.type === 'weekday')?.value || '';
    const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
    const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
    const currentMinutes = hour * 60 + minute;

    // Map weekday name to dayIndex (0 = Sunday, 1 = Monday, ...)
    const dayMap: Record<string, number> = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    const currentDayIndex = dayMap[weekdayStr] ?? now.getDay();
    const todaySchedule = businessData.hours.find((h) => h.dayIndex === currentDayIndex);

    let isOpen = false;
    let statusBadgeText = 'Closed';
    let subText = '';

    if (todaySchedule) {
      const [openH, openM] = todaySchedule.openTime.split(':').map(Number);
      const [closeH, closeM] = todaySchedule.closeTime.split(':').map(Number);
      const openMinutes = openH * 60 + openM;
      const closeMinutes = closeH * 60 + closeM;

      if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
        isOpen = true;
        const closeTimeFormatted = closeH > 12 ? `${closeH - 12}:${closeM.toString().padStart(2, '0')} PM` : `${closeH}:${closeM.toString().padStart(2, '0')} AM`;
        statusBadgeText = `Open Now · Closes ${closeTimeFormatted.replace(':00', '')}`;
        subText = `Welcome to drop in or book ahead`;
      } else if (currentMinutes < openMinutes) {
        isOpen = false;
        const openTimeFormatted = openH > 12 ? `${openH - 12}:${openM.toString().padStart(2, '0')} PM` : `${openH}:${openM.toString().padStart(2, '0')} AM`;
        statusBadgeText = `Closed · Opens ${openTimeFormatted.replace(':00', '')} Today`;
        subText = `Doors open at ${openTimeFormatted}`;
      } else {
        // After closing time, look at tomorrow's schedule
        const tomorrowIndex = (currentDayIndex + 1) % 7;
        const tomorrowSchedule = businessData.hours.find((h) => h.dayIndex === tomorrowIndex);
        if (tomorrowSchedule) {
          const [tOpenH, tOpenM] = tomorrowSchedule.openTime.split(':').map(Number);
          const tOpenFormatted = tOpenH > 12 ? `${tOpenH - 12}:${tOpenM.toString().padStart(2, '0')} PM` : `${tOpenH}:${tOpenM.toString().padStart(2, '0')} AM`;
          statusBadgeText = `Closed · Opens ${tOpenFormatted.replace(':00', '')} Tomorrow`;
          subText = `${tomorrowSchedule.dayName} hours: ${tomorrowSchedule.formattedDisplay}`;
        } else {
          statusBadgeText = 'Closed';
          subText = 'Check weekly schedule below';
        }
      }
    }

    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} GMT`;

    return {
      isOpen,
      statusBadgeText,
      subText,
      currentDayIndex,
      todayHours: todaySchedule,
      currentTimeLondon: timeString,
    };
  }

  useEffect(() => {
    // Check every 30 seconds
    const interval = setInterval(() => {
      setStatus(calculateStatus());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return status;
}
