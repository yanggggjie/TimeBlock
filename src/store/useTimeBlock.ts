import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type IBlockType =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'gray'

export interface IBlockConfig {
  type: IBlockType
  color: string
  title: string
  defaultTitle: string
}

interface ITimeBlockStore {
  blockTypeList: IBlockType[]
  selectedIndexList: number[]
  blockConfigList: IBlockConfig[]
}

export const useTimeBlockStore = create<ITimeBlockStore>()(
  persist(
    (set) => {
      return {
        blockTypeList: Array.from({ length: 24 * 2 }).fill(
          'gray',
        ) as IBlockType[],
        selectedIndexList: [],
        blockConfigList: [
          {
            type: 'red',
            color: '#de6a63',
            title: '睡觉',
            defaultTitle: '红色',
          },
          {
            type: 'orange',
            color: '#f09b5a',
            title: '日常',
            defaultTitle: '橙色',
          },
          {
            type: 'yellow',
            color: '#f6cf79',
            title: '玩手机',
            defaultTitle: '黄色',
          },
          {
            type: 'green',
            color: '#92ce62',
            title: '学习',
            defaultTitle: '绿色',
          },
          {
            type: 'blue',
            color: '#007AFF',
            title: '运动',
            defaultTitle: '蓝色',
          },
          {
            type: 'purple',
            color: '#84d4d1',
            title: '工作',
            defaultTitle: '紫色',
          },
          {
            type: 'gray',
            color: '#8E8E93',
            title: '待定',
            defaultTitle: '灰色',
          },
        ],
      }
    },
    {
      name: 'TimeBlockStore',
    },
  ),
)
