import { cn } from '@/lib/utils/cn'
interface PageShapeProps {
  className?: string
  position:
    | 'top'
    | 'bottom-left'
    | 'bottom-right'
    | 'header'
    | 'dark-top'
    | 'dark-bottom'
    | 'light-bottom'
    | 'light-top'
  style?: 'scroll' | 'slide'
}

export const PageShape: React.FC<PageShapeProps> = ({ position, className = '', style }) => {
  const transforms = ['', 'scale(-1, 1)', 'scale(1, -1)', 'scale(-1, -1)'] // 0 normal, 1 flip horizontal, 2 flip vertical, 3 flip both
  const randomTransform = transforms[Math.floor(Math.random() * transforms.length)]

  if (position === 'header') {
    return (
      <div className="w-full h-[1240px] z-20">
        <svg
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 337" // Adjusted viewBox height to 1245 to add 5px at the bottom
          preserveAspectRatio="xMidYMax meet"
          style={{ fontSize: 0, float: 'left' }}
          className={cn(className, 'absolute -bottom-[2px] flex')}
          transform={transforms[0]}
        >
          <defs>
            <mask id="mask">
              <rect width="1920" height="332" fill="white" />
              <polygon points="0 0 0 135 1255 330 1920 0 1920 0 1920 0 0 0" stroke-width="2" />

              {/* <polygon points="0 0 0 201.561092 0 1036.200679 0 1087.625789 1255.099121 1240.909908 1920 908.450984 1920 201.561092 1920 0 0 0" /> */}
            </mask>
          </defs>
          <rect width="1920" height="332" fill="white" mask="url(#mask)" />
          <rect y="331" width="1920" height="7" fill="white" />{' '}
          {/* Added white rectangle at the bottom */}
        </svg>
        {/* <div className="absolute bottom-0 border-none left-0 w-full h-[20px] z-10 bg-white" /> */}
      </div>
    )
  }
  if (position === 'top') {
    //top of a white section
    return (
      <div className="w-full h-[100px] md:h-[332px] z-20 bg-white">
        <svg
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 332" // Adjusted viewBox height to 1245 to add 5px at the bottom
          preserveAspectRatio="xMidYMax meet"
          className={cn(className, 'absolute ')}
          style={{ fontSize: 0, float: 'left' }}
          transform={transforms[1]}
        >
          <defs>
            <mask id="mask">
              <rect width="100%" height="100%" fill="white" />
              <polygon points="0 0 0 135 1255 332 1920 0 1920 0 1920 0 0 0" />
            </mask>
          </defs>
          <polygon points="0 0 0 135 1255 332 1920 0 1920 0 1920 0 0 0" fill="black" />
          {/* <rect width="100%" height="100%" fill="white" mask="url(#mask)" /> */}
          {/* Added white rectangle at the bottom */}
        </svg>
        {/* <div className="absolute bottom-0 border-none left-0 w-full h-[20px] z-10 bg-white" /> */}
      </div>
    )
  }
  if (position === 'dark-top') {
    //top of a white section
    return (
      <div className="w-full h-[70px] md:h-[332px] z-20 content-end block overflow-hidden -mb-1">
        <svg
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 332" // Adjusted viewBox height to 1245 to add 5px at the bottom
          preserveAspectRatio="xMidYMax meet"
          className={cn(className, 'relative ')}
          style={{ fontSize: 0, float: 'left' }}
          transform={transforms[3]}
        >
          <defs>
            <mask id="mask">
              <rect width="100%" height="100%" fill="white" />
              <polygon points="0 0 0 135 1255 332 1920 0 1920 0 1920 0 0 0" />
            </mask>
          </defs>
          <polygon points="0 0 0 135 1255 332 1920 0 1920 0 1920 0 0 0" fill="black" />
          {/* <rect width="100%" height="100%" fill="white" mask="url(#mask)" /> */}
          {/* Added white rectangle at the bottom */}
        </svg>
        {/* <div className="absolute bottom-0 border-none left-0 w-full h-[20px] z-10 bg-white" /> */}
      </div>
    )
  }
  if (position === 'dark-bottom') {
    // bottom of a white section
    return (
      <div className="w-full min-h-[70px] md:min-h-[350px] z-20 content-start block overflow-hidden bg-white -mb-1">
        <svg
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 332" // Adjusted viewBox height to 1245 to add 5px at the bottom
          // preserveAspectRatio="xMidYMax meet"
          preserveAspectRatio="none"
          style={{ fontSize: 0, float: 'left', alignContent: 'flex-end', objectFit: 'contain' }}
          className={cn(className, 'w-full block overflow-hidden')}
          transform={transforms[1]}
        >
          {/* <defs>
            <mask id="mask">
              <rect width="100%" height="100%" fill="white" />
              <polygon points="0 0 0 135 1255 332 1920 0 1920 0 1920 0 0 0" />
            </mask>
          </defs> */}
          <polygon points="0 0 0 135 1255 332 1920 5 1920 0 1920 0 0 0" fill="black" />
          {/* <rect width="100%" height="100%" fill="white" mask="url(#mask)"fill='#0D0907' /> */}
          {/* Added white rectangle at the bottom */}
        </svg>
        {/*        <div className="absolute bottom-0 border-none left-0 w-full h-[20px] z-10 bg-white" /> */}
      </div>
    )
  }

  if (position === 'light-bottom') {
    // bottom of a white section
    return (
      <div className="w-full min-h-[70px] md:min-h-[350px] z-20 content-end block overflow-hidden">
        <svg
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 332" // Adjusted viewBox height to 1245 to add 5px at the bottom
          // preserveAspectRatio="xMidYMax meet"
          preserveAspectRatio="none"
          style={{ fontSize: 0, float: 'left', alignContent: 'flex-end', objectFit: 'contain' }}
          className={cn(className, 'w-full block overflow-hidden')}
          transform={transforms[3]}
        >
          {/* <defs>
            <mask id="mask">
              <rect width="100%" height="100%" fill="white" />
              <polygon points="0 0 0 135 1255 332 1920 0 1920 0 1920 0 0 0" />
            </mask>
          </defs> */}
          <polygon points="0 0 0 135 1255 332 1920 5 1920 0 1920 0 0 0" fill="black" />
          {/* <rect width="100%" height="100%" fill="white" mask="url(#mask)"fill='#0D0907' /> */}
          {/* Added white rectangle at the bottom */}
        </svg>
        {/*        <div className="absolute bottom-0 border-none left-0 w-full h-[20px] z-10 bg-white" /> */}
      </div>
    )
  }

  if (position === 'bottom-left' || position === 'bottom-right') {
    // bottom of a white section
    return (
      <div
        className={`w-full min-h-[70px] md:min-h-[350px] z-20 content-end block overflow-hidden mb-[-1px] ${style === 'scroll' ? 'bg-white' : ''}`}
      >
        <svg
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 332" // Adjusted viewBox height to 1245 to add 5px at the bottom
          // preserveAspectRatio="xMidYMax meet"
          preserveAspectRatio="none"
          style={{ fontSize: 0, float: 'left', alignContent: 'flex-end', objectFit: 'contain' }}
          className={cn(className, 'w-full block overflow-hidden')}
          transform={position === 'bottom-left' ? transforms[3] : transforms[2]}
        >
          {/* <defs>
            <mask id="mask">
              <rect width="100%" height="100%" fill="white" />
              <polygon points="0 0 0 135 1255 332 1920 0 1920 0 1920 0 0 0" />
            </mask>
          </defs> */}
          <polygon points="0 0 0 135 1255 332 1920 5 1920 0 1920 0 0 0" fill="black" />
          {/* <rect width="100%" height="100%" fill="white" mask="url(#mask)"fill='#0D0907' /> */}
          {/* Added white rectangle at the bottom */}
        </svg>
        {/*        <div className="absolute bottom-0 border-none left-0 w-full h-[20px] z-10 bg-white" /> */}
      </div>
    )
  }
}

export const Mask = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 1245"
      className={cn(className, 'absolute w-full h-full')}
    >
      <defs>
        <mask id="mask">
          {/* The entire section is black, meaning it's hidden */}
          <rect width="100%" height="100%" fill="black" />
          {/* The polygon shape is white, meaning it's visible (transparent) */}
          <polygon
            fill="white"
            points="0 0 0 201.561092 0 1036.200679 0 1087.625789 1255.099121 1240.909908 1920 908.450984 1920 201.561092 1920 0 0 0"
          />
        </mask>
      </defs>

      {/* Apply the mask to a black rectangle to create transparency */}
      <rect width="100%" height="100%" fill="black" mask="url(#mask)" />
    </svg>
  )
}

// <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1240" className={cn(className, 'absolute bottom-[0px]')}>
//       <defs>
//         <mask id="mask">
//           <rect width="100%" height="100%" fill="white" />
//           <polygon
//             // fill="black"
//             points="0 0 0 201.561092 0 1036.200679 0 1092.625789 1255.099121 1240.909908 1920 908.450984 1920 201.561092 1920 0 0 0"
//           />
//         </mask>
//       </defs>
//       <rect width="100%" height="100%" fill="white" mask="url(#mask)" />
//     </svg>

/// working

// {/* <svg
//           id="Layer_1"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1920 350" // Adjusted viewBox height to 1245 to add 5px at the bottom
//           className={cn(className, 'absolute bottom-0')}
//           transform={transforms[0]}
//         >
//           <defs>
//             <mask id="mask">
//               <rect width="100%" height="100%" fill="white" />
//               <polygon points="0 0 0 135 1255.099121 332 1920 0 1920 0 1920 0 0 0" />
//             </mask>
//           </defs>
//           <rect width="100%" height="100%" fill="white" mask="url(#mask)" />
//           {/* Added white rectangle at the bottom */}
//         </svg> */}
