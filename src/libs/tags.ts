import client from "./client"
import { Tags } from "../interfaces/tags"

// 取得
export const get = (): Promise<Tags> => {
  return client.get("/")
}

// モック
export const getTagsMock = (): Tags => {
  return {
    tags: [
      { id: 1, name: "タグ1" },
      { id: 2, name: "タグ2" },
      { id: 3, name: "タグ3" },
      { id: 4, name: "タグ4" },
      { id: 5, name: "ここにたくさんのタグが入ります" },
      { id: 6, name: "タグ6" },
      { id: 7, name: "タグ7" },
      { id: 8, name: "タグ8" },
    ],
  }
}