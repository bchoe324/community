import axiosInstance from "@/api/axios";

function setHeader(key: string, value: string) {
  axiosInstance.defaults.headers.common[key] = value;
}

function getHeader() {}

function deleteHeader(key: string) {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  } else {
    delete axiosInstance.defaults.headers.common[key];
  }
}

export { deleteHeader, setHeader };
