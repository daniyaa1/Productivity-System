let ioInstance;

export const setSocketServer = (io) => {
  ioInstance = io;
};

export const getSocketServer = () => ioInstance;

export const emitTasksChanged = () => {
  if (ioInstance) {
    ioInstance.emit("tasks:changed", { timestamp: Date.now() });
  }
};

