export let currentSpeed = 0.6; // Default speed

export const setSpeed = (value: number) => {
    currentSpeed = value;
};

export const getSpeed = () => currentSpeed;
