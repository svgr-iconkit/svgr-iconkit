
import { Icon, createFamily } from '@svgr-iconkit/core'
import { map as flagIconsMap } from '@svgr-iconkit/flag-icons/data/regular/index'
import IconRightContent from '@svgr-iconkit/bootstrap/data/regular/arrow-right'
import { useLayoutEffect, useState } from 'react'

const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'brown', 'gray', 'black']

type IconNames = keyof typeof flagIconsMap
const iconNames = Object.keys(flagIconsMap) as IconNames[]

const Iconset = createFamily<IconNames, 'regular'>({
  familyName: 'flag-icons',
  defaultVariant: 'regular',
  variantsMap: {
    regular: flagIconsMap,
  },
})


export default function IconPage() {
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