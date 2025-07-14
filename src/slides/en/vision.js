import colors from "@/assets/colors.js";

export default {
    name: 'vision',
    title: 'Our Vision',
    component: 'ScrollingFullBg',
    content: {
        buttonsLegend: "",
        defaultButtonLabel: "Back",
        buttonBgColor: colors.accent,
        buttonTextColor: colors.textDark,
        modes: {
            default: {
                bgImage: "/img/biorome_1.png",
                title: "Our Vision",
                paragraphs: [
                    "We envision an agriculture that is not at odds with its environment but an integral part of it—a system that embraces the best of both biological and digital sciences to optimize the use of our land and water. In this new paradigm, farming becomes a process of working with natural cycles, harnessing advanced technology to fine-tune the delicate balance between nature’s inherent rhythms and human ingenuity. This is agriculture reimagined, where every action is designed to recycle nutrients and boost the health of local ecosystems.",
                    "At the core of our vision is the belief that the future of agriculture lies in intelligent, autonomous systems powered by artificial intelligence and the Internet of Things. Our mission is to revolutionize farming by developing technology that integrates real-time environmental data with precise automated control. By doing so, we can optimize resource use, reduce environmental impacts, and create resilient systems that adapt to changing conditions—ensuring a steady, sustainable food supply even in times of crisis.",
                    "This approach represents a significant departure from traditional methods that often rely on heavy machinery and chemical inputs. Instead, we leverage innovations from Industry 4.0 to design systems that work harmoniously with the natural world. We use modular technologies—each tailored to a specific task—to create dynamic, adaptable systems that continuously learn and improve. While each component is simple, together they form a complex, responsive network capable of fine-tuning agricultural processes in real time.",
                    "Our commitment is to bring together cutting-edge digital tools and time-tested ecological practices. The result is an agriculture that is not only more efficient and sustainable but also more in tune with the environment it depends on. By adopting this vision, we aim to set a new standard for farming—one where technology and nature coalesce to create a future that is both innovative and regenerative."
                ],
                titleColor: colors.primary,
                paragraphsColor: colors.textLight,
                textPosition: "right"
            }
        }
    }
};