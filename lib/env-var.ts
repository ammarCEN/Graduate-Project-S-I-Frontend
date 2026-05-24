export const ENV = {
    RobotConnectIP:
        process.env.NEXT_PUBLIC_ROBOT_IP_BASE,
    IsAutoConnect:
        process.env.NEXT_PUBLIC_SYSTEM_AUTO_CONNECT === "0",
}