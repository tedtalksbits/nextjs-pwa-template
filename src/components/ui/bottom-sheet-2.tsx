// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { motion, useAnimation, PanInfo, useDragControls } from 'framer-motion';

// interface DraggableBottomSheetProps {
//   children: React.ReactNode;
//   trigger: React.ReactNode;
// }

// export default function DraggableBottomSheet({
//   children,
//   trigger,
// }: DraggableBottomSheetProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [sheetState, setSheetState] = useState<'closed' | 'default' | 'full'>(
//     'closed'
//   );
//   const controls = useAnimation();
//   const dragControls = useDragControls();
//   const constraintsRef = useRef<HTMLDivElement>(null);
//   const sheetRef = useRef<HTMLDivElement>(null);

//   const [sheetHeight, setSheetHeight] = useState({
//     closed: 0,
//     default: 0,
//     full: 0,
//   });

//   useEffect(() => {
//     const updateSheetHeight = () => {
//       setSheetHeight({
//         closed: 0,
//         default: window.innerHeight * 0.8,
//         full: window.innerHeight - 64,
//       });
//     };

//     updateSheetHeight();
//     window.addEventListener('resize', updateSheetHeight);
//     return () => window.removeEventListener('resize', updateSheetHeight);
//   }, []);

//   useEffect(() => {
//     if (isOpen) {
//       setSheetState('default');
//       controls.start({ y: -sheetHeight.default });
//     } else {
//       setSheetState('closed');
//       controls.start({ y: 0 });
//     }
//   }, [isOpen, controls, sheetHeight]);

//   useEffect(() => {
//     if (isOpen && sheetRef.current) {
//       controls.start({ y: -sheetHeight[sheetState] });
//     }
//   }, [sheetState, controls, isOpen, sheetHeight]);

//   const handleDragEnd = (
//     event: MouseEvent | TouchEvent | PointerEvent,
//     info: PanInfo
//   ) => {
//     const threshold = 50;
//     const velocity = info.velocity.y;
//     const direction = velocity > 0 ? 'down' : 'up';

//     if (direction === 'down') {
//       if (sheetState === 'full') {
//         setSheetState('default');
//       } else if (sheetState === 'default') {
//         setIsOpen(false);
//       }
//     } else {
//       if (sheetState === 'default') {
//         setSheetState('full');
//       }
//     }

//     if (Math.abs(velocity) > threshold) {
//       if (direction === 'down') {
//         setIsOpen(false);
//       } else {
//         setSheetState('full');
//       }
//     }
//   };

//   const toggleSheet = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <div onClick={toggleSheet} className='inline-block'>
//         {trigger}
//       </div>
//       <div
//         className='fixed inset-0 overflow-hidden pointer-events-none'
//         style={{ zIndex: 50 }}
//       >
//         <div ref={constraintsRef} className='absolute inset-0'>
//           <motion.div
//             ref={sheetRef}
//             drag='y'
//             dragControls={dragControls}
//             dragConstraints={constraintsRef}
//             dragElastic={0.2}
//             dragMomentum={false}
//             onDragEnd={handleDragEnd}
//             animate={controls}
//             initial={{ y: 0 }}
//             className='absolute inset-x-0 rounded-t-xl bg-card shadow-lg pointer-events-auto'
//             style={{ height: sheetHeight.full, bottom: -sheetHeight.full }}
//             transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//           >
//             <div
//               className='h-1 w-16 bg-border rounded-full mx-auto my-3'
//               onPointerDown={(e) => dragControls.start(e)}
//             />
//             <div
//               className='p-4 overflow-y-auto'
//               style={{ maxHeight: sheetHeight.full - 40 }}
//             >
//               {children}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </>
//   );
// }

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, PanInfo, useDragControls } from 'framer-motion';

interface DraggableBottomSheetProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
}

export default function DraggableBottomSheet({
  children,
  trigger,
}: DraggableBottomSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const [sheetHeight, setSheetHeight] = useState(0);

  useEffect(() => {
    const updateSheetHeight = () => {
      setSheetHeight(window.innerHeight * 0.8);
    };

    updateSheetHeight();
    window.addEventListener('resize', updateSheetHeight);
    return () => window.removeEventListener('resize', updateSheetHeight);
  }, []);

  useEffect(() => {
    if (isOpen) {
      controls.start({ y: -sheetHeight });
    } else {
      controls.start({ y: 0 });
    }
  }, [isOpen, controls, sheetHeight]);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const velocity = info.velocity.y;
    const threshold = 500;

    if (velocity > threshold) {
      setIsOpen(false);
    } else {
      controls.start({ y: -sheetHeight + info.offset.y });
    }
  };

  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div onClick={toggleSheet} className='inline-block'>
        {trigger}
      </div>
      <div
        className='fixed inset-0 overflow-hidden pointer-events-none'
        style={{ zIndex: 50 }}
      >
        <div ref={constraintsRef} className='absolute inset-0'>
          <motion.div
            ref={sheetRef}
            drag='y'
            dragControls={dragControls}
            dragConstraints={{ top: -sheetHeight, bottom: 0 }}
            dragElastic={0.1}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            animate={controls}
            initial={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className='absolute inset-x-0 rounded-t-xl bg-card shadow-lg pointer-events-auto'
            style={{ height: sheetHeight, bottom: -sheetHeight }}
          >
            <div
              className='h-1 w-16 bg-gray-300 rounded-full mx-auto my-3'
              onPointerDown={(e) => dragControls.start(e)}
            />
            <div
              className='p-4 overflow-y-auto'
              style={{ height: sheetHeight - 40 }}
            >
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
