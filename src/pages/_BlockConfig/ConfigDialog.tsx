import React, { Dispatch, SetStateAction, useRef } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useTimeBlockStore } from '../../store/useTimeBlock.ts'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function ConfigDialog({ open, setOpen }: Props) {
  const { blockConfigList } = useTimeBlockStore() // 假设 blockConfigList 是一个数组
  const refs = useRef<(HTMLInputElement | null)[]>([]) // 用来保存所有 TextFields 的引用

  const handleSave = () => {
    const newValues = refs.current.map((ref, index) => {
      return ref?.value || '' // 获取每个输入框的值
    })
    useTimeBlockStore.setState(({ blockConfigList }) => {
      return {
        blockConfigList: blockConfigList.map((item, index) => {
          return {
            ...item,
            title: newValues[index],
          }
        }),
      }
    })
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false)
      }}
    >
      <DialogTitle>修改标签名</DialogTitle>
      <DialogContent className={'flex flex-col gap-[10px]'}>
        <div></div>
        {blockConfigList.map((blockConfig, index) => {
          return (
            <TextField
              key={index}
              label={blockConfig.defaultTitle}
              defaultValue={blockConfig.title} // 使用非受控的方式
              inputRef={(el) => (refs.current[index] = el)} // 通过 ref 获取输入框 DOM
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              sx={{
                '& .MuiInputLabel-root': {
                  color: blockConfig.color, // 标签颜色
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: blockConfig.color, // 聚焦时的标签颜色
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'gray', // 默认边框颜色
                  },
                  '&:hover fieldset': {
                    borderColor: blockConfig.color, // 悬停时的边框颜色
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: blockConfig.color, // 聚焦时的边框颜色
                  },
                },
              }}
            />
          )
        })}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false)
          }}
          color={'secondary'}
        >
          取消
        </Button>
        <Button
          onClick={handleSave} // 点击保存时获取所有输入框的值
          color="primary"
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  )
}
