'use client'

import {
  Box,
  Button,
  DrawerCloseButton,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

// Motion owns the animation props and forwards everything else (including
// Chakra style props) to the wrapped component, which renders the element.
export const MotionBox = motion(Box)
export const MotionButton = motion(Button)
export const MotionDrawerCloseButton = motion(DrawerCloseButton)
export const MotionFlex = motion(Flex)
export const MotionHeading = motion(Heading)
export const MotionHStack = motion(HStack)
export const MotionText = motion(Text)
export const MotionVStack = motion(VStack)
