import React from 'react';
import htm from 'htm';
import { 
    Network, Globe, Smartphone, Server, Box, Router, Split, Map, 
    List, MessageSquare, Layers, ShieldCheck, Wifi, Scissors, 
    ArrowRight, Home, Mail, CheckSquare, Cloud, Laptop, FileText, XCircle, Users, Database
} from 'lucide-react';

const html = htm.bind(React.createElement);

export const LECTURE_SLIDES = [
    {
        id: 1,
        title: "ネットワークの構成",
        icon: html`<${Network} size=${40} className="text-blue-600" />`,
        content: html`
            <div className="space-y-6">
                
                ${/* Graphical Diagram */ ''}
                <div className="flex flex-col items-center py-4">
                    <div className="relative z-10 bg-blue-100 p-4 rounded-full text-blue-600 shadow-sm">
                        <${Globe} size=${48} />
                        <span className="absolute top-full left-1/2 -translate-x-1/2 text-xs font-bold text-blue-800 mt-1 whitespace-nowrap">インターネット</span>
                    </div>
                    <div className="h-12 border-l-2 border-dashed border-slate-300"></div>
                    <div className="relative w-full max-w-sm bg-slate-50 border-2 border-slate-200 rounded-xl p-6 shadow-sm">
                        <div className="absolute -top-3 left-4 bg-white px-2 text-xs font-bold text-slate-500 border border-slate-200 rounded-full flex items-center gap-1">
                            <${Home} size=${12} /> 家や学校 (LAN)
                        </div>
                        <div className="flex justify-around items-end text-slate-600">
                            <div className="flex flex-col items-center gap-1">
                                <${Laptop} size=${32} />
                                <span className="text-[10px]">PC</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <${Smartphone} size=${28} />
                                <span className="text-[10px]">スマホ</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <${Wifi} size=${24} />
                                <span className="text-[10px]">Wi-Fi</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-lg text-blue-800 mb-1 flex items-center gap-2">
                        <${Network} size=${20} /> LAN (Local Area Network)
                    </h3>
                    <p className="text-slate-700 text-sm">
                        図の下側のように、学校や会社、家庭内などの<strong>限られた範囲</strong>のネットワーク。
                    </p>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <h3 className="font-bold text-lg text-indigo-800 mb-1 flex items-center gap-2">
                        <${Globe} size=${20} /> WAN (Wide Area Network)
                    </h3>
                    <p className="text-slate-700 text-sm">
                        LANどうしを<strong>広い範囲</strong>で結んだネットワーク。インターネットも巨大なWANの一つと言えます。
                    </p>
                </div>
            </div>
        `,
        quiz: {
            question: "学校や会社など、限られた範囲のネットワークを何と呼びますか？",
            options: ["WAN", "LAN", "ISP"],
            answerIndex: 1,
            explanation: "正解！LAN (Local Area Network) は、図の家や学校の中のように、限定された範囲のネットワークです。"
        }
    },
    {
        id: 2,
        title: "接続に必要なハードウェア",
        icon: html`<${Box} size=${40} className="text-orange-600" />`,
        content: html`
            <div className="space-y-6">
                
                ${/* Hardware Connection Flow Diagram */ ''}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 overflow-x-auto">
                    <div className="text-xs font-bold text-slate-400 mb-2 text-center uppercase tracking-widest">Connection Flow</div>
                    <div className="flex items-center justify-center min-w-[300px] gap-2">
                        <div className="flex flex-col items-center gap-1 min-w-[50px]">
                            <${Cloud} className="text-blue-400" size=${24} />
                            <span className="text-[10px] text-slate-500 font-bold">WAN</span>
                        </div>
                        <${ArrowRight} size=${16} className="text-slate-300" />
                        
                        <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg border border-slate-200 shadow-sm min-w-[60px]">
                            <${Box} className="text-slate-600" size=${24} />
                            <span className="text-[10px] font-bold">ONU</span>
                        </div>
                        <${ArrowRight} size=${16} className="text-slate-300" />

                        <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg border border-orange-200 shadow-sm min-w-[60px]">
                            <${Router} className="text-orange-600" size=${24} />
                            <span className="text-[10px] font-bold text-orange-700">Router</span>
                        </div>
                        <${ArrowRight} size=${16} className="text-slate-300" />

                        <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg border border-green-200 shadow-sm min-w-[60px]">
                            <${Split} className="text-green-600" size=${24} />
                            <span className="text-[10px] font-bold text-green-700">Switch</span>
                        </div>
                        
                        <div className="h-px w-4 bg-slate-300"></div>
                        <${Laptop} size=${20} className="text-slate-500" />
                    </div>
                </div>

                <div className="grid gap-3">
                    <div className="flex gap-3 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                        <div className="p-2 bg-slate-100 rounded h-fit"><${Box} size=${20} /></div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-sm">ONU</h3>
                            <p className="text-xs text-slate-600 mt-1">光通信回線の光信号と、LAN内の電気信号を変換します。</p>
                        </div>
                    </div>

                    <div className="flex gap-3 bg-white p-3 rounded-lg border border-orange-100 shadow-sm">
                        <div className="p-2 bg-orange-100 rounded h-fit text-orange-600"><${Router} size=${20} /></div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-sm">ルータ (Router)</h3>
                            <p className="text-xs text-slate-600 mt-1">ネットワークどうしを接続するための機器です。</p>
                        </div>
                    </div>

                    <div className="flex gap-3 bg-white p-3 rounded-lg border border-green-100 shadow-sm">
                        <div className="p-2 bg-green-100 rounded h-fit text-green-600"><${Split} size=${20} /></div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-sm">集線装置 (Hub/Switch)</h3>
                            <p className="text-xs text-slate-600 mt-1">LANにつながれた機器どうしを接続するための装置です。</p>
                        </div>
                    </div>
                </div>
            </div>
        `,
        quiz: {
            question: "異なるネットワークを接続し、データの最適な経路を決める機器はどれ？",
            options: ["ONU", "スイッチ", "ルーター"],
            answerIndex: 2,
            explanation: "正解！図の真ん中にある「ルーター」が、外（WAN）と中（LAN）をつなぐ役割を果たします。"
        }
    },
    {
        id: 3,
        title: "クライアントサーバシステム",
        icon: html`<${Server} size=${40} className="text-indigo-600" />`,
        content: html`
            <div className="space-y-6">
                
                ${/* Visual Representation */ ''}
                <div className="flex items-center justify-center gap-4 py-8 bg-indigo-50 rounded-xl border border-indigo-100">
                    <div className="flex flex-col items-center">
                        <div className="relative">
                             <${Laptop} size=${48} className="text-slate-700" />
                             <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Client</div>
                        </div>
                        <span className="text-xs font-bold text-slate-600 mt-2">PC・スマホ</span>
                    </div>

                    <div className="flex flex-col gap-2 w-32">
                        <div className="bg-white px-2 py-1 rounded text-[10px] border border-slate-200 shadow-sm text-center flex items-center justify-center gap-1 text-slate-500">
                             <span className="font-bold">Web見せて！</span> <${ArrowRight} size=${12} />
                        </div>
                        <div className="bg-white px-2 py-1 rounded text-[10px] border border-slate-200 shadow-sm text-center flex items-center justify-center gap-1 text-slate-500">
                             <${ArrowRight} size=${12} className="rotate-180" /> <span className="font-bold">どうぞ！</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="relative">
                             <${Server} size=${48} className="text-indigo-600" />
                             <div className="absolute -top-2 -right-2 bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Server</div>
                        </div>
                        <span className="text-xs font-bold text-slate-600 mt-2">Webサーバなど</span>
                    </div>
                </div>

                <div className="grid gap-3">
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 text-sm mb-1">クライアント (Client)</h3>
                        <p className="text-xs text-slate-600">サービスを<strong>「要求する（リクエスト）」</strong>側。Webブラウザなどがこれにあたります。</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-indigo-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 text-sm mb-1">サーバ (Server)</h3>
                        <p className="text-xs text-slate-600">サービスを<strong>「提供する（レスポンス）」</strong>側。24時間稼働して応答を待ちます。</p>
                    </div>
                </div>
            </div>
        `,
        quiz: {
            question: "Webサイトのデータを保管し、要求に応じて提供するコンピュータはどっち？",
            options: ["クライアント", "サーバ", "ルーター"],
            answerIndex: 1,
            explanation: "正解です。サービスを提供する（Serve）側なので「サーバ」と呼びます。"
        }
    },
    {
        id: 4,
        title: "通信方式の移り変わり",
        icon: html`<${Scissors} size=${40} className="text-red-600" />`,
        content: html`
            <div className="space-y-6">
                
                ${/* Visual Comparison */ ''}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 opacity-60 flex flex-col items-center">
                        <div className="text-xs font-bold mb-2 bg-slate-200 px-2 py-1 rounded">昔：回線交換</div>
                        <div className="flex items-center justify-between w-full my-2 px-2">
                            <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                            <div className="h-1 flex-1 bg-slate-600 mx-1 relative">
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px]">占有中</span>
                            </div>
                            <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                        </div>
                        <p className="text-[10px] text-center text-slate-500">
                            1本の電話線を2人で独占。<br/>他の人は使えない。
                        </p>
                    </div>

                    <div className="bg-red-50 p-4 rounded-xl border-2 border-red-200 flex flex-col items-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">現在の主流</div>
                        <div className="text-xs font-bold mb-2 text-red-700 bg-red-100 px-2 py-1 rounded">パケット交換</div>
                        
                        <div className="flex items-center justify-between w-full my-2 px-2">
                            <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                            <div className="flex-1 mx-1 flex gap-1 justify-center items-center h-4 bg-slate-200 rounded-full px-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                                <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                                <div className="w-2 h-2 bg-yellow-500 rounded-sm"></div>
                                <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                            </div>
                            <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                        </div>
                        <p className="text-[10px] text-center text-slate-600 leading-tight">
                            データを<strong className="text-red-600">パケット</strong>に分割。<br/>
                            みんなで回線を共有！
                        </p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                        <${Scissors} size=${20} /> パケット交換方式のメリット
                    </h3>
                    <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        <li>回線を占有しないため、<strong>利用効率が高い</strong>。</li>
                        <li>これにより、インターネットの<strong>常時接続</strong>や定額制が可能になった。</li>
                        <li>データが壊れても、そのパケットだけ送り直せば良い。</li>
                    </ul>
                </div>
            </div>
        `,
        quiz: {
            question: "データを小さく分割して送信し、回線の利用効率を高めた現在の通信方式は？",
            options: ["回線交換方式", "パケット交換方式", "伝言ゲーム方式"],
            answerIndex: 1,
            explanation: "その通り！「パケット交換方式」の図のように、データを細切れにすることで、一本の回線をみんなで譲り合って効率よく使えます。"
        }
    },
    {
        id: 5,
        title: "ルーティングとIPアドレス",
        icon: html`<${Map} size=${40} className="text-green-600" />`,
        content: html`
            <div className="space-y-6">
                
                <div className="bg-white p-4 rounded-xl border-l-4 border-blue-500 shadow-sm mb-4">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-1">
                        <${List} size=${18} className="text-blue-600" /> IPアドレス
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        インターネット上のコンピュータに割り当てられた<strong>固有の番号（住所）</strong>です。
                        <br/><span className="text-xs text-slate-500">例: 192.168.1.1 (IPv4の場合、32ビットを8ビットずつ区切る)</span>
                    </p>
                </div>

                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                     <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
                        <${Map} size=${18} className="text-green-600" /> ルーティングテーブルの例
                    </h3>
                    
                    ${/* Simplified Routing Table Visual */ ''}
                    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden text-xs">
                        <div className="grid grid-cols-3 bg-slate-100 font-bold border-b border-slate-200 p-2 text-slate-600">
                            <div>宛先 (Dest)</div>
                            <div>転送先 (Gateway)</div>
                            <div>距離 (Metric)</div>
                        </div>
                        <div className="grid grid-cols-3 p-2 border-b border-slate-100">
                            <div className="font-mono">ネットA</div>
                            <div>直接接続</div>
                            <div>1</div>
                        </div>
                        <div className="grid grid-cols-3 p-2 border-b border-slate-100 bg-yellow-50">
                            <div className="font-mono font-bold text-green-700">ネットB</div>
                            <div className="font-bold text-green-700">ルータ2</div>
                            <div className="font-bold text-green-700">2 (最短)</div>
                        </div>
                        <div className="grid grid-cols-3 p-2 text-slate-400">
                            <div className="font-mono">ネットB</div>
                            <div>ルータ4</div>
                            <div>3 (遠い)</div>
                        </div>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-2 leading-relaxed">
                        ルータは内部にある<strong>「ルーティングテーブル」</strong>を見て、パケットを最適な経路（メトリックが小さい方など）へ送り出します。
                    </p>
                </div>
            </div>
        `,
        quiz: {
            question: "ルーターがパケットの転送先を決めるために参照する「地図」のようなデータは？",
            options: ["アドレス帳", "ルーティングテーブル", "タイムテーブル"],
            answerIndex: 1,
            explanation: "正解です。ルーティングテーブルに従って、宛先ごとに最適な次の転送先（ゲートウェイ）を決定します。"
        }
    },
    {
        id: 6,
        title: "プロトコル (Protocol)",
        icon: html`<${MessageSquare} size=${40} className="text-indigo-600" />`,
        content: html`
            <div className="space-y-6">
                
                ${/* Protocol Analogy Visual */ ''}
                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 flex flex-col items-center text-center">
                     <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-200">
                            <div className="text-2xl">🗣️ 🇯🇵</div>
                            <div className="text-[10px] font-bold text-slate-500 mt-1">日本語</div>
                        </div>
                        <div className="text-slate-400 font-bold text-xl">≠</div>
                        <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-200">
                            <div className="text-2xl">🇺🇸 🗣️</div>
                            <div className="text-[10px] font-bold text-slate-500 mt-1">English</div>
                        </div>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-full text-xs font-bold text-red-500 shadow-sm mb-4">
                        <${XCircle} size=${12} className="inline mr-1"/>
                        会話が成立しない！
                    </div>
                    <div className="flex items-center justify-center gap-2 text-indigo-800 font-bold">
                        <${FileText} size=${20} />
                        <span>共通のルール（規約）が必要</span>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-2">
                        プロトコルの役割
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                        メーカーやOSが違うコンピュータ同士でも、<strong>「プロトコル（通信規約）」</strong>という共通の約束事を守ることで、正しくデータをやり取りできます。
                    </p>
                </div>
            </div>
        `,
        quiz: {
            question: "通信を成立させるための「約束事」や「規約」を何と呼びますか？",
            options: ["プロトコル", "アルゴリズム", "プログラム"],
            answerIndex: 0,
            explanation: "正解！プロトコル（Protocol）は、言語のルールのようなもので、これが合うことで初めて通信が成立します。"
        }
    },
    {
        id: 7,
        title: "TCP/IPの階層構造",
        icon: html`<${Layers} size=${40} className="text-teal-600" />`,
        content: html`
            <div className="space-y-6">
                <p className="text-slate-700 font-medium text-sm">
                    インターネットの標準プロトコルセット<strong>「TCP/IP」</strong>は、役割ごとに4つの階層に分かれています。
                </p>

                ${/* TCP/IP Stack Visual */ ''}
                <div className="flex flex-col gap-1 max-w-sm mx-auto text-sm">
                    
                    <div className="flex items-center bg-orange-100 rounded border border-orange-200 p-2">
                        <span className="w-8 font-bold text-orange-800 text-xs">4層</span>
                        <div className="flex-1 font-bold text-slate-700">アプリケーション層</div>
                        <div className="text-[10px] text-slate-500">HTTP, SMTP等</div>
                    </div>

                    <div className="flex items-center bg-teal-100 rounded border border-teal-200 p-2">
                        <span className="w-8 font-bold text-teal-800 text-xs">3層</span>
                        <div className="flex-1 font-bold text-slate-700">トランスポート層</div>
                        <div className="text-[10px] text-slate-500">TCP, UDP</div>
                    </div>

                    <div className="flex items-center bg-blue-100 rounded border border-blue-200 p-2">
                        <span className="w-8 font-bold text-blue-800 text-xs">2層</span>
                        <div className="flex-1 font-bold text-slate-700">インターネット層</div>
                        <div className="text-[10px] text-slate-500">IP</div>
                    </div>
                    
                    <div className="flex items-center bg-slate-200 rounded border border-slate-300 p-2">
                        <span className="w-8 font-bold text-slate-600 text-xs">1層</span>
                        <div className="flex-1 font-bold text-slate-700">ネットワークI/F層</div>
                        <div className="text-[10px] text-slate-500">Ethernet, Wi-Fi</div>
                    </div>

                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                     <div className="bg-white p-3 rounded-lg border border-teal-100 shadow-sm">
                         <div className="text-xs font-bold text-teal-600 mb-1">TCPの役割</div>
                         <p className="text-[10px] text-slate-600">データの正確性を保証する（パケットの抜け漏れチェックなど）。</p>
                     </div>
                     <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                         <div className="text-xs font-bold text-blue-600 mb-1">IPの役割</div>
                         <p className="text-[10px] text-slate-600">IPアドレスを用いて、宛先までパケットを届ける。</p>
                     </div>
                </div>
            </div>
        `,
        quiz: {
            question: "データの正確性を保証する役割を持つプロトコルはどれ？",
            options: ["IP", "TCP", "HTTP"],
            answerIndex: 1,
            explanation: "正解です！TCPはデータの漏れや順序の間違いをチェックし、信頼性を保証します。IPは届ける役割です。"
        }
    }
];