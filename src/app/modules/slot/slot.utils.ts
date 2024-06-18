export const createTimeSlots = (startTime: string, endTime: string, slotDuration: number) => {
    // Destructure and convert startTime and endTime from 'HH:MM' format strings to hours and minutes
    const [startHour, startMinute] = startTime?.split(':').map(Number);
    const [endHour, endMinute] = endTime?.split(':').map(Number);

    // If startMinute exceeds slotDuration, use startMinute; otherwise, default to 0
    const adjustedStartMinute = startMinute >= slotDuration ? startMinute : 0;
    // If endMinute exceeds slotDuration, use endMinute; otherwise, default to 0
    const adjustedEndMinute = endMinute >= slotDuration ? endMinute : 0;

    // Calculate the total minutes from midnight for the start and end times
    const totalStartMinutes = (startHour * 60) + adjustedStartMinute;
    const totalEndMinutes = (endHour * 60) + adjustedEndMinute;

    let currentSlotStartTime = totalStartMinutes;
    const slots = [];

    // Loop to create time slots within given time range
    while (currentSlotStartTime + slotDuration <= totalEndMinutes) {
        // Calculate start hour minute of the current slot
        const slotStartHour = Math.floor(currentSlotStartTime / 60);
        const slotStartMinute = currentSlotStartTime % 60;

        // Calculate end time in minutes for the current slot
        const slotEndMinutes = currentSlotStartTime + slotDuration;
        // Calculate end hour and minute of the current slot
        const slotEndHour = Math.floor(slotEndMinutes / 60);
        const slotEndMinute = slotEndMinutes % 60;

        // Format start and end times to 'HH:MM' string
        let formattedSlotStart = `${String(slotStartHour).padStart(2, '0')}:${String(slotStartMinute).padStart(2, '0')}`;
        let formattedSlotEnd = `${String(slotEndHour).padStart(2, '0')}:${String(slotEndMinute).padStart(2, '0')}`;

        // Add the formatted time slot to the slots array
        slots.push({
            startTime: formattedSlotStart,
            endTime: formattedSlotEnd
        });

        // Move to the next slot start time
        currentSlotStartTime += slotDuration;
    }

    return slots;
}
