
type nativeEvent = 'click' | 'submit' | 'change'


export type handlers<
    elements extends string = '',
    sink extends string = '',
    bubble extends string = '',
> = (props: { 
        elements: Record<
            elements, 
            Record< 'render' | nativeEvent, 
                (props: { 
                    elements: Record<elements, HTMLElement>,
                    bubble: (type: bubble, payload: object) => void,
                    event: CustomEvent,
                }) => void | Promise<void>
            >
        >,

        host: Record<
        sink | 'connect' | 'disconnect', 
        (props: { 
            elements: Record<elements, HTMLElement>,
            bubble: (type: bubble, payload: object) => void,
            event: CustomEvent,
        }) => void | Promise<void>
    >
}) => void

