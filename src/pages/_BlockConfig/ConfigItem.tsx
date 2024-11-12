import React from 'react'
import { twMerge } from 'tailwind-merge'
import {
  IBlockConfig,
  IBlockType,
  useTimeBlockStore,
} from '../../store/useTimeBlock.ts'
import { Button } from '@mui/material'
interface Props {
  blockConfig: IBlockConfig
}

export default function ConfigItem({ blockConfig }: Props) {
  const { selectedIndexList } = useTimeBlockStore()

  const hasSelected = selectedIndexList.length > 0

  function handleClick() {
    useTimeBlockStore.setState(({ selectedIndexList, blockTypeList }) => {
      const t = blockTypeList.map((item, index) => {
        if (selectedIndexList.includes(index)) return blockConfig.type
        return item
      }) as IBlockType[]

      return {
        blockTypeList: t,
        selectedIndexList: [],
      }
    })
  }

  return (
    <div className={'flex flex-row items-center justify-center'}>
      <button key={blockConfig.type} className={twMerge('relative')}>
        <Button
          onClick={handleClick}
          variant={'contained'}
          sx={{
            background: blockConfig.color,
            width: '200px',
            opacity: hasSelected ? '1' : '0.7',
          }}
        >
          {blockConfig.title.length > 0
            ? blockConfig.title
            : blockConfig.defaultTitle}
        </Button>
      </button>
    </div>
  )
}
