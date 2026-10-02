'use client'

import { Box, Button, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { motion } from 'motion/react'

// Motion owns the animation props and forwards everything else (including
// Chakra style props) to the wrapped component, which renders the element.
export const MotionBox = motion.create(Box)
export const MotionButton = motion.create(Button)
export const MotionFlex = motion.create(Flex)
export const MotionHeading = motion.create(Heading)
export const MotionHStack = motion.create(HStack)
export const MotionText = motion.create(Text)
export const MotionVStack = motion.create(VStack)
