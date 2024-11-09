import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import EditSVG from './edit.svg?react'
interface Props {}

type IBlockType =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'gray'

interface IBlockConfig {
  color: string
}
const blockConfigMap: Record<IBlockType, IBlockConfig> = {
  red: {
    color: '#FF3B30',
  },
  orange: {
    color: '#FF9500',
  },
  yellow: {
    color: '#FFCC00',
  },
  green: {
    color: '#34C759',
  },
  blue: { color: '#007AFF' },
  purple: {
    color: '#AF52DE',
  },
  gray: {
    color: '#8E8E93',
  },
}

const initBlockConfigList = [
  {
    type: 'red',
    color: '#FF3B30',
    title: '红色',
  },
  {
    type: 'orange',
    color: '#FF9500',
    title: '橙色',
  },
  {
    type: 'yellow',
    color: '#FFCC00',
    title: '黄色',
  },
  {
    type: 'green',
    color: '#34C759',
    title: '绿色',
  },
  {
    type: 'blue',
    color: '#007AFF',
    title: '蓝色',
  },
  {
    type: 'purple',
    color: '#AF52DE',
    title: '紫色',
  },
  {
    type: 'gray',
    color: '#8E8E93',
    title: '灰色',
  },
]

function genBlock(): IBlockType[] {
  return Array.from({
    length: 24 * 2,
  }).fill('gray') as IBlockType[]
}

export default function Index({}: Props) {
  const [blockList, setBlockList] = useState(genBlock())
  const [blockConfigList, setBlockConfigList] = useState(initBlockConfigList)

  return (
    <div className={'grid place-items-center'}>
      <div className={' grid grid-cols-3 gap-[10px] font-mono'}>
        {blockList.map((block, index) => {
          const config = blockConfigMap[block]
          return (
            <>
              {index % 2 == 0 && (
                <div>
                  {(index / 2).toString().padStart(2, '0')}:00 --{' '}
                  {(index / 2 + 1).toString().padStart(2, '0')}:00
                </div>
              )}
              <div
                className={twMerge('w-[120px] h-[30px]')}
                style={{
                  background: config.color,
                }}
              ></div>
            </>
          )
        })}
      </div>
      <div
        className={twMerge(
          'fixed top-1/2 -translate-y-1/2 right-0',
          'flex flex-col gap-[10px]',
        )}
      >
        {blockConfigList.map((block) => {
          return (
            <div
              className={twMerge(
                'w-[70px] h-[30px] text-white',
                'flex flex-row items-center justify-center',
              )}
              style={{
                background: block.color,
              }}
            >
              {block.title}
              <EditSVG></EditSVG>
            </div>
          )
        })}
      </div>
    </div>
  )
}
