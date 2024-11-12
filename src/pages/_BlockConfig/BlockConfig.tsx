import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import ConfigItem from './ConfigItem.tsx'
import { useTimeBlockStore } from '../../store/useTimeBlock.ts'
import { Button, Typography } from '@mui/material'
import ConfigDialog from './ConfigDialog.tsx'

interface Props {}

export default function BlockConfig({}: Props) {
  const { blockConfigList, selectedIndexList } = useTimeBlockStore()
  const [open, setOpen] = useState(false)
  return (
    <div
      className={twMerge(
        'fixed top-1/2 -translate-y-1/2 right-0',
        'flex flex-col gap-[10px]',
      )}
    >
      <ConfigDialog open={open} setOpen={setOpen}></ConfigDialog>
      <Button
        variant={'contained'}
        onClick={() => {
          setOpen(true)
        }}
      >
        修改标签
      </Button>
      {blockConfigList.map((blockConfig) => {
        return <ConfigItem blockConfig={blockConfig}></ConfigItem>
      })}
      <Button
        variant={'contained'}
        disabled={selectedIndexList.length === 0}
        onClick={() => {
          useTimeBlockStore.setState(() => {
            return {
              selectedIndexList: [],
            }
          })
        }}
      >
        取消选择
      </Button>
      <div className={'w-[100px] flex flex-row items-center justify-center'}>
        <div className={'flex flex-row'}>
          <Typography
            sx={{
              fontSize: 13,
              fontFamily: 'monospace',
              fontWeight: 'bold',
            }}
          >
            选中
            <span className={'text-[18px]'}>
              {((selectedIndexList.length * 30) / 60).toFixed(1)}
            </span>
            小时
          </Typography>
        </div>
      </div>
    </div>
  )
}
