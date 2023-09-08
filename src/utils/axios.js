import axios from "axios";
const DOMAIN = "http://ondol.o-r.kr:8080";

const request = axios.create({
  baseURL: `${DOMAIN}/api`,
});
export const api = {
  // 메뉴 관련 API
  menus: {
    findAll: () => request.get("/menus"),
    findOne: (id) => request.get(`/menus/${id}`),
    create: (name, description, file) => {
      // 파일 전송을 할 경우 formData로 감싸서 보내야 한다
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("file", file);
      return request.post("/menus", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    update: (id, name, description) =>
      request.patch(`/menus/${id}`, {
        name,
        description,
      }),
    updateImage: (id, file) => {
      const formData = new FormData();
      formData.append("file", file);
      return request.post(`/menus/${id}/image`, formData, {
        "Content-Type": "multipart/form-data",
      });
    },
    delete: (id) => request.delete(`/menus/${id}`),
  },

  // 주문 관련 API
  orders: {
    findAll: () => request.get("/orders"),
    findOne: (id) => request.get(`/orders/${id}`),
    create: (menus_id, quantity, request_detail) =>
      request.post(`/orders`, {
        menus_id,
        quantity,
        request_detail,
      }),
    update: (id, menus_id, quantity, request_detail) =>
      request.patch(`/orders/${id}`, {
        menus_id,
        quantity,
        request_detail,
      }),
    delete: (id) => request.delete(`/orders/${id}`),
  },
};
