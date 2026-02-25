import React from 'react';

/**
 * Professional Framer Motion mock that prevents animation props from leaking to the DOM.
 * This avoids React "unknown prop" warnings and kept the test output clean.
 */
const componentWithNoMotionProps = (Tag) => {
    const Component = ({
        children,
        whileHover,
        whileTap,
        whileInView,
        whileDrag,
        whileFocus,
        initial,
        animate,
        exit,
        variants,
        transition,
        viewport,
        layout,
        onAnimationStart,
        onAnimationComplete,
        onUpdate,
        onDragStart,
        onDrag,
        onDragEnd,
        onMeasureDragConstraints,
        onDirectionLock,
        onScroll,
        ...props
    }) => {
        return React.createElement(Tag, props, children);
    };
    Component.displayName = `Motion(${Tag})`;
    return Component;
};

const motion = new Proxy(
    {},
    {
        get: (_, tag) => componentWithNoMotionProps(tag),
    }
);

const AnimatePresence = ({ children }) => <>{children}</>;
const LayoutGroup = ({ children }) => <>{children}</>;
const m = motion;

export { motion, AnimatePresence, LayoutGroup, m };

export const useScroll = () => ({ scrollYProgress: { onChange: jest.fn(), on: jest.fn() } });
export const useTransform = (value) => value;
export const useSpring = (value) => value;
export const useCycle = (items) => [items[0], jest.fn()];
export const useAnimation = () => ({ start: jest.fn(), stop: jest.fn(), set: jest.fn() });
export const useDragControls = () => ({ start: jest.fn() });
export const useInView = () => [jest.fn(), true];

export default {
    motion,
    AnimatePresence,
    LayoutGroup,
    m,
    useScroll,
    useTransform,
    useSpring,
    useCycle,
    useAnimation,
    useDragControls,
    useInView,
};
