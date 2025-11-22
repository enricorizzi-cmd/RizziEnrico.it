'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CTA from '@/components/CTA';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface BlogPostClientProps {
    post: {
        title: string;
        excerpt: string;
        content: string;
        publishedAt: string;
        author: string;
        tags: string[];
    };
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
    // Hook used here, which is fine because this is a Client Component
    const { ref, isVisible } = useScrollAnimation();

    return (
        <article className="bg-white min-h-screen">
            {/* Header Premium */}
            <div className="bg-[var(--color-bg-secondary)] py-20 border-b border-[var(--color-line)]/50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <Link href="/blog" className="text-[var(--color-primary)] font-semibold hover:underline mb-6 inline-block">
                            ← Torna al Blog
                        </Link>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-[var(--color-primary)] text-white rounded-full text-sm font-bold uppercase tracking-wide shadow-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-[var(--color-subtext)]">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] font-bold">
                                    {post.author.charAt(0)}
                                </div>
                                <span className="font-medium text-[var(--color-text)]">{post.author}</span>
                            </div>
                            <span>•</span>
                            <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString('it-IT', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-16">
                <div className="max-w-3xl mx-auto">
                    {/* Content */}
                    <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed">
                        <ReactMarkdown
                            components={{
                                h1: ({ node, ...props }) => (
                                    <h1 {...props} className="text-3xl font-bold mb-6 mt-12 first:mt-0 text-[var(--color-text)] font-heading" />
                                ),
                                h2: ({ node, ...props }) => (
                                    <h2 {...props} className="text-2xl font-bold mb-4 mt-10 first:mt-0 text-[var(--color-text)] font-heading border-b border-[var(--color-line)] pb-2" />
                                ),
                                h3: ({ node, ...props }) => (
                                    <h3 {...props} className="text-xl font-bold mb-3 mt-8 first:mt-0 text-[var(--color-text)] font-heading" />
                                ),
                                p: ({ node, ...props }) => (
                                    <p {...props} className="mb-6 text-[var(--color-text)] leading-relaxed text-lg" />
                                ),
                                ul: ({ node, ...props }) => (
                                    <ul {...props} className="list-disc pl-6 mb-6 text-[var(--color-text)] space-y-2" />
                                ),
                                ol: ({ node, ...props }) => (
                                    <ol {...props} className="list-decimal pl-6 mb-6 text-[var(--color-text)] space-y-2" />
                                ),
                                li: ({ node, ...props }) => (
                                    <li {...props} className="text-[var(--color-text)] text-lg" />
                                ),
                                strong: ({ node, ...props }) => (
                                    <strong {...props} className="font-bold text-[var(--color-primary)]" />
                                ),
                                blockquote: ({ node, ...props }) => (
                                    <blockquote {...props} className="border-l-4 border-[var(--color-primary)] pl-4 italic text-[var(--color-subtext)] my-8 bg-[var(--color-bg-secondary)] p-4 rounded-r-lg" />
                                ),
                                a: ({ node, ...props }) => (
                                    <a
                                        {...props}
                                        className="text-[var(--color-primary)] font-semibold underline hover:no-underline transition-all"
                                        target={props.href?.startsWith('http') ? '_blank' : undefined}
                                    />
                                ),
                                hr: ({ node, ...props }) => (
                                    <hr {...props} className="my-12 border-[var(--color-line)]" />
                                ),
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* CTA */}
                    <div
                        ref={ref}
                        className={`mt-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-[2rem] p-10 text-white shadow-xl relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                    >
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl mix-blend-overlay"></div>
                            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl mix-blend-overlay"></div>
                        </div>

                        <div className="relative z-10 text-center">
                            <h2 className="font-heading text-2xl font-bold mb-4">
                                Vuoi implementare questi consigli nella tua PMI?
                            </h2>
                            <p className="mb-8 opacity-90 text-lg">
                                Non lasciare che rimanga solo teoria. Prenota una diagnosi gratuita e vediamo come applicare il metodo alla tua realtà.
                            </p>
                            <CTA href="/contatti" variant="secondary" size="large" className="bg-white text-[var(--color-primary)] hover:bg-gray-100 border-none shadow-lg hover:shadow-xl hover:-translate-y-1">
                                Prenota diagnosi 30' →
                            </CTA>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
