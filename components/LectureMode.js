import React, { useState, useEffect } from 'react';
import htm from 'htm';
import { ChevronRight, ChevronLeft, BookOpen, Home, CheckCircle, HelpCircle, XCircle, ChevronDown, ChevronUp, Map } from 'lucide-react';
import { LECTURE_SLIDES as ALL_SLIDES } from '../data/lectures.js';

const html = htm.bind(React.createElement);

export const LectureMode = ({ onExit, onComplete, slides = ALL_SLIDES, offset = 0, totalSlides = ALL_SLIDES.length, initialSlideIndex = 0 }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlideIndex);
    const [maxReachedIndex, setMaxReachedIndex] = useState(initialSlideIndex); // Track the furthest slide reached
    const [isQuizOpen, setIsQuizOpen] = useState(false); // Toggle for quiz visibility
    
    const [quizState, setQuizState] = useState({
        answered: false,
        correct: false,
        selectedOption: null
    });

    const slide = slides[currentSlideIndex];
    // Safety check in case index is out of bounds
    if (!slide) {
        return html`<div>Error: Slide not found</div>`;
    }

    const isFirst = currentSlideIndex === 0;
    const isLast = currentSlideIndex === slides.length - 1;

    // Reset quiz state and close accordion when slide changes
    useEffect(() => {
        setQuizState({
            answered: false,
            correct: false,
            selectedOption: null
        });
        setIsQuizOpen(false); // Collapse quiz by default on new slide
    }, [currentSlideIndex]);

    // Update max reached index whenever we advance
    useEffect(() => {
        if (currentSlideIndex > maxReachedIndex) {
            setMaxReachedIndex(currentSlideIndex);
        }
    }, [currentSlideIndex, maxReachedIndex]);

    const handleOptionClick = (index) => {
        if (quizState.answered && quizState.correct) return;

        const isCorrect = index === slide.quiz.answerIndex;
        setQuizState({
            answered: true,
            correct: isCorrect,
            selectedOption: index
        });
        
        // If correct, update max reached immediately so they can move freely
        if (isCorrect && currentSlideIndex >= maxReachedIndex) {
            setMaxReachedIndex(currentSlideIndex + 1); // Allow moving to next
        }
    };

    const nextSlide = () => {
        if (!isLast) {
            setCurrentSlideIndex(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (!isFirst) setCurrentSlideIndex(prev => prev - 1);
    };

    // Determine if we can proceed
    // Proceed if: 
    // 1. We have reached a further slide in the past (Free movement)
    // 2. OR No quiz exists
    // 3. OR Quiz is answered correctly
    const visitedBefore = currentSlideIndex < maxReachedIndex;
    const canProceed = visitedBefore || !slide.quiz || (quizState.answered && quizState.correct);

    // Calculate absolute progress
    const currentGlobalIndex = currentSlideIndex + offset;
    
    // Check if this is the absolute last slide of all lectures
    const isAbsoluteLast = offset + slides.length === totalSlides && isLast;

    return html`
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans h-screen w-screen overflow-hidden">
            ${/* Header */ ''}
            <header className="bg-white border-b border-slate-200 py-4 px-6 shadow-sm shrink-0 flex items-center justify-between z-10 relative">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600 rounded-lg text-white">
                        <${BookOpen} size=${24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">情報通信ネットワーク</h1>
                        <p className="text-xs text-slate-500">基本知識レクチャー</p>
                    </div>
                </div>
                <button 
                    onClick=${onExit}
                    className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors font-bold text-sm"
                >
                    <${Home} size=${18} />
                    ホームに戻る
                </button>
            </header>

            ${/* Main Slide Content */ ''}
            <main className="flex-1 overflow-y-auto bg-slate-100">
                <div className="min-h-full p-4 md:p-8 flex items-center justify-center">
                    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[500px] animate-in fade-in zoom-in-95 duration-300">
                        
                        ${/* Slide Header */ ''}
                        <div className="bg-slate-50 border-b border-slate-100 p-6 md:p-8 flex items-center gap-4">
                            <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                                ${slide.icon}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                                ${slide.title}
                            </h2>
                        </div>

                        ${/* Slide Body */ ''}
                        <div className="p-6 md:p-10 text-base md:text-lg leading-relaxed text-slate-700">
                            ${slide.content}
                        </div>

                        ${/* Interactive Quiz Section (Collapsible) */ ''}
                        ${slide.quiz && html`
                            <div className="px-6 md:px-10 pb-8">
                                <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden transition-all">
                                    <button 
                                        onClick=${() => setIsQuizOpen(!isQuizOpen)}
                                        className="w-full flex items-center justify-between p-4 bg-slate-100 hover:bg-slate-200 transition-colors text-left"
                                    >
                                        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                                            <${HelpCircle} size=${18} className="text-indigo-500" /> 理解度チェック
                                        </h3>
                                        ${isQuizOpen ? html`<${ChevronUp} size=${20} className="text-slate-500" />` : html`<${ChevronDown} size=${20} className="text-slate-500" />`}
                                    </button>
                                    
                                    ${isQuizOpen && html`
                                        <div className="p-6 border-t border-slate-200 animate-in slide-in-from-top-2">
                                            <p className="font-bold text-slate-800 mb-4 text-lg">Q. ${slide.quiz.question}</p>
                                            
                                            <div className="grid grid-cols-1 gap-3 mb-4">
                                                ${slide.quiz.options.map((option, idx) => {
                                                    let btnClass = "p-4 rounded-lg border-2 text-left font-bold transition-all ";
                                                    if (quizState.answered && quizState.selectedOption === idx) {
                                                        if (idx === slide.quiz.answerIndex) {
                                                            btnClass += "bg-green-100 border-green-500 text-green-800";
                                                        } else {
                                                            btnClass += "bg-red-100 border-red-500 text-red-800";
                                                        }
                                                    } else if (quizState.answered && idx === slide.quiz.answerIndex) {
                                                        btnClass += "bg-green-50 border-green-200 text-green-600";
                                                    } else {
                                                        btnClass += "bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700";
                                                    }
                                                    
                                                    return html`
                                                        <button 
                                                            key=${idx}
                                                            onClick=${() => handleOptionClick(idx)}
                                                            disabled=${quizState.answered && quizState.correct}
                                                            className=${btnClass}
                                                        >
                                                            ${option}
                                                        </button>
                                                    `;
                                                })}
                                            </div>

                                            ${quizState.answered && html`
                                                <div className=${`p-4 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2 ${quizState.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    <div className="mt-1">
                                                        ${quizState.correct ? html`<${CheckCircle} size=${20} />` : html`<${XCircle} size=${20} />`}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold mb-1">${quizState.correct ? "正解！" : "残念..."}</div>
                                                        <div className="text-sm leading-relaxed">${quizState.correct ? slide.quiz.explanation : "もう一度考えてみましょう。"}</div>
                                                    </div>
                                                </div>
                                            `}
                                        </div>
                                    `}
                                    
                                    ${!isQuizOpen && html`
                                        <div className="p-3 text-center text-xs text-slate-400 bg-white">
                                            解説を読んだらクリックして問題に挑戦しましょう
                                        </div>
                                    `}
                                </div>
                            </div>
                        `}

                        ${/* Progress Bar */ ''}
                        <div className="h-1 bg-slate-100 w-full mt-auto">
                            <div 
                                className="h-full bg-indigo-600 transition-all duration-500"
                                style=${{ width: `${((currentGlobalIndex + 1) / totalSlides) * 100}%` }}
                            ></div>
                        </div>

                        ${/* Footer Navigation */ ''}
                        <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-between items-center">
                            <button 
                                onClick=${prevSlide}
                                disabled=${isFirst}
                                className=${`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all
                                    ${isFirst 
                                        ? 'text-slate-300 cursor-not-allowed' 
                                        : 'text-slate-600 hover:bg-white hover:shadow-md'
                                    }
                                `}
                            >
                                <${ChevronLeft} size=${20} /> 前へ
                            </button>

                            <span className="text-sm font-bold text-slate-400">
                                ${currentGlobalIndex + 1} / ${totalSlides}
                            </span>

                            ${!isLast ? html`
                                <div className="relative group">
                                    <button 
                                        onClick=${nextSlide}
                                        disabled=${!canProceed}
                                        className=${`flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95
                                            ${canProceed 
                                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-200' 
                                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                            }
                                        `}
                                    >
                                        次へ <${ChevronRight} size=${20} />
                                    </button>
                                    ${!canProceed && html`
                                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            クイズに正解して進みましょう
                                        </div>
                                    `}
                                </div>
                            ` : html`
                                <div className="flex items-center gap-3">
                                    ${/* Geolocation Button - Only show if it's the absolute last slide and can proceed */ ''}
                                    ${isAbsoluteLast && canProceed && html`
                                        <a
                                            href="https://www.geolocation.com/ja/index"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-lg transition-all active:scale-95 no-underline"
                                        >
                                            <${Map} size=${20} /> ジオロケーションにアクセス
                                        </a>
                                    `}

                                    <button 
                                        onClick=${onComplete}
                                        disabled=${!canProceed}
                                        className=${`flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 animate-pulse
                                             ${canProceed 
                                                ? 'bg-green-600 hover:bg-green-700 text-white hover:shadow-green-200' 
                                                : 'bg-slate-200 text-slate-400 cursor-not-allowed animate-none'
                                            }
                                        `}
                                    >
                                        ${offset + slides.length < totalSlides ? 'シミュレーターへ進む' : '学習を完了する'} <${CheckCircle} size=${20} />
                                    </button>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `;
};