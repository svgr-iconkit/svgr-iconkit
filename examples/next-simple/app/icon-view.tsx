
import { Icon } from '@svgr-iconkit/core'
import Iconset, { iconNames, type IconNames } from '@svgr-iconkit/flag-icons'
import IconRightContent from '@svgr-iconkit/bootstrap/data/regular/arrow-right'
import { useLayoutEffect, useState } from 'react'

const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'brown', 'gray', 'black']



export default function IconView() {
    const [iconName, setIconName] = useState<IconNames>(iconNames[0])
      const [colorName, setColorName] = useState<string>('red')
  
    useLayoutEffect (() => {
  
      let timer = setInterval(() => {
        setIconName(iconNames[Math.floor(Math.random() * iconNames.length)])
        setColorName(colors[Math.floor(Math.random() * colors.length)])
      }, 1000)
  
      return () => clearInterval(timer)
    })
  
    return (
      <>
        <div>
          Icon from Flag: <Iconset color={colorName} name={iconName} size={25} /><br />
          Icon from Bootstrap: <Icon content={IconRightContent} size={25} />
        </div>
      </>
    )
}