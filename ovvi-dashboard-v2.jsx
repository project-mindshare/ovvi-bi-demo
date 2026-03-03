import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from "recharts";
import {
  LayoutDashboard, Megaphone, GitMerge, Store, Search, Handshake,
  Target, TrendingUp, TrendingDown, DollarSign, CreditCard, BarChart2,
  Rocket, Globe, Mail, Zap, Trophy, Clock, Sparkles, AlertTriangle,
  Lightbulb, CheckCircle2, Activity, Users, RefreshCw, Layers,
  FileText, Download, Radio, ArrowUpRight, ArrowDownRight,
  Building2, Gauge, MapPin
} from "lucide-react";

// ─── TOKENS ──────────────────────────────────────────────────────────────────
const C = {
  bg:"#07080F", surface:"#0D0F1C", panel:"#111428", border:"#1E2240",
  accent:"#00E5FF", gold:"#FFB800", green:"#00E676", red:"#FF3D71",
  purple:"#A259FF", text:"#E8EAFF", muted:"#6B7280",
  chart:["#00E5FF","#FFB800","#A259FF","#00E676","#FF6B35","#FF3D71"],
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const revenueData = months.map((m,i)=>({
  month:m,
  MRR: Math.round(180000+Math.sin(i/2)*30000+i*8000),
  Forecast: Math.round(195000+Math.sin(i/2)*30000+i*10200),
}));

const channelData = [
  {channel:"Google Ads",leads:412,cpl:48,conv:7.8},
  {channel:"SEO/Organic",leads:287,cpl:12,conv:9.2},
  {channel:"LinkedIn",leads:134,cpl:87,conv:11.4},
  {channel:"Facebook",leads:198,cpl:34,conv:6.1},
  {channel:"Email",leads:156,cpl:8,conv:14.2},
  {channel:"Partners",leads:241,cpl:22,conv:13.7},
];

const channelSorted = [...channelData].sort((a,b)=>b.conv-a.conv);

const funnelStages = [
  {name:"New Leads",value:1247,fill:C.accent},
  {name:"Contacted",value:892,fill:C.purple},
  {name:"Demo Sched.",value:534,fill:C.gold},
  {name:"Proposal",value:312,fill:"#FF6B35"},
  {name:"Underwriting",value:178,fill:C.green},
  {name:"Closed Won",value:98,fill:"#00C853"},
];

const verticalData = [
  {vertical:"Restaurant",merchants:124,ltv:28400,churn:6.2,vol:38000},
  {vertical:"Retail",merchants:87,ltv:19800,churn:14.1,vol:24000},
  {vertical:"Gas Station",merchants:56,ltv:47200,churn:4.8,vol:82000},
  {vertical:"Salon/Spa",merchants:43,ltv:15600,churn:9.3,vol:18000},
];

// Fixed: ensure values sum correctly for pie
const competitorSOV = [
  {name:"OVVI",value:31},
  {name:"Clover",value:24},
  {name:"Toast",value:19},
  {name:"Square",value:14},
  {name:"Lightspeed",value:8},
  {name:"Others",value:4},
];

const sentimentData = months.map((m,i)=>({
  month:m,
  OVVI:Math.round(72+Math.sin(i/1.5)*8+i*0.4),
  Clover:Math.round(58+Math.sin(i/2)*6),
  Toast:Math.round(61+Math.sin(i/1.8)*5),
  Square:Math.round(54+Math.sin(i/2.2)*7),
}));

const cohortData = [
  {month:"M1",Restaurant:100,Retail:100,GasStation:100,Salon:100},
  {month:"M3",Restaurant:94,Retail:88,GasStation:97,Salon:91},
  {month:"M6",Restaurant:89,Retail:80,GasStation:94,Salon:84},
  {month:"M9",Restaurant:84,Retail:72,GasStation:91,Salon:77},
  {month:"M12",Restaurant:78,Retail:63,GasStation:88,Salon:70},
  {month:"M18",Restaurant:71,Retail:54,GasStation:84,Salon:62},
  {month:"M24",Restaurant:65,Retail:46,GasStation:81,Salon:55},
];

const repData = [
  {name:"Marcus T.",closed:24,pipeline:340000,winRate:68},
  {name:"Priya S.",closed:21,pipeline:280000,winRate:71},
  {name:"Devon K.",closed:19,pipeline:240000,winRate:59},
  {name:"Aaliya R.",closed:17,pipeline:210000,winRate:63},
  {name:"James W.",closed:14,pipeline:180000,winRate:54},
  {name:"Sofia M.",closed:12,pipeline:155000,winRate:61},
  {name:"Chris P.",closed:9,pipeline:120000,winRate:47},
  {name:"Tara N.",closed:7,pipeline:88000,winRate:41},
];

const partnerData = [
  {name:"PayStar ISO",leads:142,conv:14.8,revenue:284000,region:"California"},
  {name:"MerchantEdge",leads:118,conv:12.3,revenue:219000,region:"Texas"},
  {name:"SwiftPay",leads:97,conv:9.7,revenue:178000,region:"Florida"},
  {name:"NexPOS Group",leads:84,conv:11.2,revenue:156000,region:"New York"},
  {name:"AlphaISO",leads:76,conv:8.4,revenue:124000,region:"Ohio"},
];

const allInsights = {
  executive:[
    {type:"opportunity",text:"Restaurant vertical has 28% higher close rate — prioritize campaign budget reallocation."},
    {type:"alert",text:"Google Ads CPA increased 14% WoW. Investigate keyword competition from Clover."},
    {type:"trend",text:"Competitor Toast increased social share of voice by 19% in the last 30 days."},
    {type:"win",text:"MRR milestone: $312K projected for Q4, +22% vs Q3 performance."},
  ],
  marketing:[
    {type:"opportunity",text:"Retail-focused landing page converting 32% better than restaurant page this quarter."},
    {type:"win",text:"Email campaigns delivering lowest CAC at $8 per qualified lead across all channels."},
    {type:"alert",text:"LinkedIn CPC up 23% — consider testing video ad format for demo bookings."},
    {type:"trend",text:"'Cash discount program' content driving 3x organic impressions vs 90 days ago."},
  ],
  sales:[
    {type:"alert",text:"Underwriting stage creating 12-day average bottleneck — 34 stalled deals flagged."},
    {type:"win",text:"Marcus T. closing 2x faster in retail segment — share playbook across team."},
    {type:"opportunity",text:"67 leads >30 days with no activity — automated re-engagement sequence recommended."},
    {type:"trend",text:"Demo-to-proposal conversion improved 8% after new deck rollout in October."},
  ],
  merchant:[
    {type:"win",text:"Gas station merchants showing highest LTV at $47.2K — expand vertical outreach strategy."},
    {type:"alert",text:"Retail merchants churning 18% higher than restaurant segment — intervention needed."},
    {type:"trend",text:"Average processing volume up 11% QoQ across all active merchant accounts."},
    {type:"opportunity",text:"Salon/spa segment growing 24% YoY — untapped partner channel opportunity identified."},
  ],
  competitive:[
    {type:"alert",text:"Clover gaining traction on 'cash discount program' messaging — counter-content needed."},
    {type:"win",text:"OVVI leads share of voice at 31% — up 4 points vs 90 days ago."},
    {type:"trend",text:"POS integration content outperforms payment-only messaging by 2.4x engagement rate."},
    {type:"opportunity",text:"Toast sentiment dropped 6 points — opportunity to capture disenchanted prospects."},
  ],
  partners:[
    {type:"win",text:"PayStar ISO delivering 2x higher close rate in California — deepen relationship."},
    {type:"alert",text:"Texas region underperforming national average by 31% — investigate MerchantEdge support."},
    {type:"opportunity",text:"3 unassigned regions showing inbound demand — fast-track partner recruitment."},
    {type:"trend",text:"Partner-sourced leads converting 13.7% vs 7.8% for paid — increase co-marketing budget."},
  ],
};

// ─── SHARED ───────────────────────────────────────────────────────────────────

const TT = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  return (
    <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",fontSize:12,zIndex:9999}}>
      {label && <div style={{color:C.muted,marginBottom:6,fontSize:11}}>{label}</div>}
      {payload.map((p,i)=>(
        <div key={i} style={{color:p.color||C.text,marginBottom:2}}>
          {p.name}: <strong>{typeof p.value==="number"?p.value.toLocaleString():p.value}</strong>
        </div>
      ))}
    </div>
  );
};

// Custom pie legend rendered as a separate element to avoid clipping
const PieLegend = ({data, colors}) => (
  <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:10}}>
    {data.map((d,i)=>(
      <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:colors?colors[i]:C.chart[i],flexShrink:0}}/>
          <span style={{color:C.muted,fontSize:10}}>{d.name}</span>
        </div>
        <span style={{color:C.text,fontSize:10,fontWeight:600}}>{d.value}{d.pct?"%":""}</span>
      </div>
    ))}
  </div>
);

const KPICard = ({label,value,delta,sub,color=C.accent,icon:Icon}) => (
  <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 20px",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${color}99,transparent)`}}/>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{color:C.muted,fontSize:10,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>{label}</div>
        <div style={{color:C.text,fontSize:24,fontFamily:"'DM Serif Display',serif",fontWeight:700,lineHeight:1}}>{value}</div>
        {sub && <div style={{color:C.muted,fontSize:10,marginTop:4}}>{sub}</div>}
      </div>
      {Icon && (
        <div style={{
          width:34,height:34,borderRadius:8,flexShrink:0,
          background:`${color}18`,border:`1px solid ${color}33`,
          display:"flex",alignItems:"center",justifyContent:"center"
        }}>
          <Icon size={16} color={color} strokeWidth={1.5}/>
        </div>
      )}
    </div>
    {delta!==undefined && (
      <div style={{
        display:"inline-flex",alignItems:"center",gap:4,marginTop:10,
        background:delta>=0?`${C.green}18`:`${C.red}18`,
        border:`1px solid ${delta>=0?C.green+"44":C.red+"44"}`,
        borderRadius:20,padding:"2px 10px",fontSize:10,
        color:delta>=0?C.green:C.red
      }}>
        {delta>=0
          ? <ArrowUpRight size={10}/>
          : <ArrowDownRight size={10}/>
        }
        {Math.abs(delta)}% vs prior period
      </div>
    )}
  </div>
);

const InsightCard = ({insight}) => {
  const cfg={
    opportunity:{Icon:Lightbulb,color:C.gold,label:"Opportunity"},
    alert:{Icon:AlertTriangle,color:C.red,label:"Alert"},
    trend:{Icon:TrendingUp,color:C.accent,label:"Trend"},
    win:{Icon:CheckCircle2,color:C.green,label:"Win"},
  }[insight.type];
  return (
    <div style={{display:"flex",gap:10,padding:"10px 12px",background:`${cfg.color}0D`,border:`1px solid ${cfg.color}33`,borderRadius:8,marginBottom:8}}>
      <div style={{flexShrink:0,marginTop:1}}>
        <cfg.Icon size={13} color={cfg.color} strokeWidth={2}/>
      </div>
      <div>
        <div style={{color:cfg.color,fontSize:9,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:2}}>{cfg.label}</div>
        <div style={{color:C.text,fontSize:11,lineHeight:1.5}}>{insight.text}</div>
      </div>
    </div>
  );
};

const Box = ({title,children,flex=1,minW=260,style={}}) => (
  <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:12,padding:"18px 18px 14px",flex,minWidth:minW,...style}}>
    {title && <div style={{color:C.muted,fontSize:10,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:14}}>{title}</div>}
    {children}
  </div>
);

const Row = ({children,gap=14}) => (
  <div style={{display:"flex",gap,flexWrap:"wrap",marginBottom:gap}}>{children}</div>
);

const Grid = ({children,cols="repeat(auto-fit,minmax(170px,1fr))",gap=14}) => (
  <div style={{display:"grid",gridTemplateColumns:cols,gap,marginBottom:gap}}>{children}</div>
);

const SectionTitle = ({title,sub}) => (
  <div style={{marginBottom:22}}>
    <h2 style={{color:C.text,fontSize:19,fontFamily:"'DM Serif Display',serif",margin:0,letterSpacing:"-0.01em"}}>{title}</h2>
    {sub && <p style={{color:C.muted,fontSize:11,margin:"4px 0 0"}}>{sub}</p>}
  </div>
);

const BarH = ({label,value,max,color,right}) => (
  <div style={{marginBottom:9}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
      <span style={{color:C.text,fontSize:11}}>{label}</span>
      <span style={{color,fontSize:11,fontWeight:600}}>{right||value}</span>
    </div>
    <div style={{background:C.border,borderRadius:4,height:6}}>
      <div style={{width:`${Math.min((value/max)*100,100)}%`,height:"100%",background:color,borderRadius:4}}/>
    </div>
  </div>
);

// ─── MODULES ──────────────────────────────────────────────────────────────────

const Executive = () => (
  <div>
    <SectionTitle title="Executive Overview" sub="Full-funnel performance · AI-powered intelligence · Real-time snapshot"/>
    <Grid>
      <KPICard label="Total Leads MTD"    value="1,247"  delta={18}  icon={Target}     color={C.accent}/>
      <KPICard label="Active Merchants"   value="312"    delta={12}  icon={Store}      color={C.green}  sub="QTD: +38 new"/>
      <KPICard label="MRR"                value="$287K"  delta={9}   icon={DollarSign} color={C.gold}   sub="ARR run-rate $3.4M"/>
      <KPICard label="Merchant CAC"       value="$312"   delta={-6}  icon={BarChart2}  color={C.purple} sub="Target: <$350"/>
      <KPICard label="Lead → Close Rate"  value="7.9%"   delta={2}   icon={RefreshCw}  color={C.accent}/>
      <KPICard label="Pipeline Value"     value="$1.84M" delta={14}  icon={Rocket}     color={C.gold}/>
    </Grid>

    <Row>
      <Box title="MRR Growth · 12 Months" flex={3} minW={320}>
        <ResponsiveContainer width="100%" height={195}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={C.accent} stopOpacity={0.35}/>
                <stop offset="95%" stopColor={C.accent} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="month" tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000).toFixed(0)}K`}/>
            <Tooltip content={<TT/>}/>
            <Area type="monotone" dataKey="MRR" stroke={C.accent} strokeWidth={2} fill="url(#g1)" name="MRR ($)"/>
          </AreaChart>
        </ResponsiveContainer>
      </Box>

      {/* FIXED PIE: use custom legend, cy="50%", enough height */}
      <Box title="Lead Source Mix" flex={1} minW={250}>
        <div style={{display:"flex",flexDirection:"column"}}>
          <ResponsiveContainer width="100%" height={155}>
            <PieChart margin={{top:0,right:0,bottom:0,left:0}}>
              <Pie
                data={channelData} dataKey="leads" nameKey="channel"
                cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                paddingAngle={3} isAnimationActive={false}
              >
                {channelData.map((e,i)=><Cell key={i} fill={C.chart[i%C.chart.length]}/>)}
              </Pie>
              <Tooltip content={<TT/>}/>
            </PieChart>
          </ResponsiveContainer>
          <PieLegend data={channelData.map((d,i)=>({name:d.channel,value:d.leads}))} colors={C.chart}/>
        </div>
      </Box>
    </Row>

    <Row>
      <Box title="Acquisition Funnel" flex={2} minW={280}>
        {funnelStages.map((s,i)=>(
          <div key={i} style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
              <span style={{color:C.text,fontSize:11}}>{s.name}</span>
              <span style={{color:s.fill,fontSize:11,fontWeight:700}}>{s.value.toLocaleString()}</span>
            </div>
            <div style={{background:C.border,borderRadius:4,height:7}}>
              <div style={{width:`${(s.value/1247)*100}%`,height:"100%",background:s.fill,borderRadius:4}}/>
            </div>
          </div>
        ))}
      </Box>
      <Box title="AI Intelligence Feed" flex={3} minW={300}>
        {allInsights.executive.map((ins,i)=><InsightCard key={i} insight={ins}/>)}
      </Box>
    </Row>
  </div>
);

const Marketing = () => (
  <div>
    <SectionTitle title="Marketing Performance" sub="Demand generation · Campaign ROI · Channel efficiency"/>
    <Grid>
      <KPICard label="Website Sessions"  value="48.3K"  delta={22}  icon={Globe}      color={C.accent} sub="MTD"/>
      <KPICard label="Avg. CPL"          value="$34.20" delta={-8}  icon={DollarSign} color={C.green}/>
      <KPICard label="Blended ROAS"      value="4.8×"   delta={11}  icon={TrendingUp}  color={C.gold}/>
      <KPICard label="Email Open Rate"   value="31.4%"  delta={5}   icon={Mail}       color={C.purple}/>
      <KPICard label="Active Campaigns"  value="12"                 icon={Megaphone}  color={C.accent} sub="4 A/B tests live"/>
    </Grid>
    <Row>
      <Box title="Channel Performance — Leads & CPL" flex={3} minW={340}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={channelData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="channel" tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}`}/>
            <Tooltip content={<TT/>}/>
            <Legend iconType="circle" iconSize={7} formatter={v=><span style={{color:C.muted,fontSize:10}}>{v}</span>}/>
            <Bar yAxisId="l" dataKey="leads" fill={C.accent} radius={[4,4,0,0]} name="Leads"/>
            <Bar yAxisId="r" dataKey="cpl"   fill={C.gold}   radius={[4,4,0,0]} name="CPL ($)"/>
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Box title="Conv. Rate by Channel" flex={2} minW={240}>
        {channelSorted.map((ch,i)=>(
          <BarH key={i} label={ch.channel} value={ch.conv} max={15} color={C.chart[i]} right={`${ch.conv}%`}/>
        ))}
      </Box>
    </Row>
    <Row>
      <Box title="Traffic: Paid vs Organic · 12 Months" flex={3} minW={340}>
        <ResponsiveContainer width="100%" height={175}>
          <AreaChart data={months.map((m,i)=>({month:m,Paid:1800+i*90+Math.round(Math.sin(i)*200),Organic:1200+i*140+Math.round(Math.cos(i)*150)}))}>
            <defs>
              <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.accent} stopOpacity={0.35}/><stop offset="95%" stopColor={C.accent} stopOpacity={0}/></linearGradient>
              <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.gold}   stopOpacity={0.35}/><stop offset="95%" stopColor={C.gold}   stopOpacity={0}/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="month" tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false}/>
            <Tooltip content={<TT/>}/>
            <Legend iconType="circle" iconSize={7} formatter={v=><span style={{color:C.muted,fontSize:10}}>{v}</span>}/>
            <Area type="monotone" dataKey="Paid"    stroke={C.accent} fill="url(#g2)" strokeWidth={2}/>
            <Area type="monotone" dataKey="Organic" stroke={C.gold}   fill="url(#g3)" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </Box>
      <Box title="AI Marketing Intelligence" flex={2} minW={260}>
        {allInsights.marketing.map((ins,i)=><InsightCard key={i} insight={ins}/>)}
      </Box>
    </Row>
  </div>
);

const Sales = () => (
  <div>
    <SectionTitle title="Sales Pipeline Intelligence" sub="Merchant acquisition pipeline · Rep performance · Revenue forecast"/>
    <Grid cols="repeat(auto-fit,minmax(160px,1fr))">
      <KPICard label="Active Deals"       value="534"    delta={7}   icon={Layers}    color={C.accent}/>
      <KPICard label="Avg. Days to Close" value="18.4"   delta={-12} icon={Clock}     color={C.green}  sub="Target: <20"/>
      <KPICard label="Win Rate"           value="62.3%"  delta={4}   icon={Trophy}    color={C.gold}/>
      <KPICard label="90-Day Pipeline"    value="$1.84M" delta={14}  icon={Activity}  color={C.purple}/>
    </Grid>
    <Row>
      <Box title="Rep Leaderboard" flex={2} minW={300}>
        {repData.map((rep,i)=>(
          <div key={i} style={{
            display:"flex",alignItems:"center",gap:12,padding:"8px 12px",marginBottom:6,
            background:i===0?`${C.gold}14`:C.surface,
            border:`1px solid ${i===0?C.gold+"44":C.border}`,borderRadius:8
          }}>
            <div style={{color:C.muted,fontSize:10,width:14,textAlign:"center"}}>{i+1}</div>
            <div style={{flex:1}}>
              <div style={{color:C.text,fontSize:12,fontWeight:600}}>{rep.name}</div>
              <div style={{color:C.muted,fontSize:10}}>Win rate: {rep.winRate}%</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{color:C.accent,fontSize:14,fontWeight:700}}>{rep.closed}</div>
              <div style={{color:C.muted,fontSize:9}}>closed</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{color:C.gold,fontSize:11,fontWeight:600}}>${(rep.pipeline/1000).toFixed(0)}K</div>
              <div style={{color:C.muted,fontSize:9}}>pipeline</div>
            </div>
          </div>
        ))}
      </Box>
      <div style={{flex:3,minWidth:300,display:"flex",flexDirection:"column",gap:14}}>
        <Box title="Pipeline by Stage">
          {funnelStages.map((s,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:s.fill,flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{color:C.text,fontSize:11}}>{s.name}</span>
                  <span style={{color:s.fill,fontSize:11,fontWeight:700}}>{s.value.toLocaleString()}</span>
                </div>
                <div style={{background:C.border,borderRadius:3,height:5,marginTop:2}}>
                  <div style={{width:`${(s.value/1247)*100}%`,height:"100%",background:s.fill,borderRadius:3}}/>
                </div>
              </div>
            </div>
          ))}
        </Box>
        <Box title="AI Sales Intelligence">
          {allInsights.sales.map((ins,i)=><InsightCard key={i} insight={ins}/>)}
        </Box>
      </div>
    </Row>
    <Box title="MRR Actual vs Forecast · 12 Months">
      <ResponsiveContainer width="100%" height={175}>
        <LineChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
          <XAxis dataKey="month" tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false}/>
          <YAxis tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000).toFixed(0)}K`}/>
          <Tooltip content={<TT/>}/>
          <Legend iconType="circle" iconSize={7} formatter={v=><span style={{color:C.muted,fontSize:10}}>{v}</span>}/>
          <Line type="monotone" dataKey="MRR"      stroke={C.accent} strokeWidth={2} dot={false} name="Actual MRR"/>
          <Line type="monotone" dataKey="Forecast" stroke={C.gold}   strokeWidth={2} strokeDasharray="6 3" dot={false} name="Forecast"/>
        </LineChart>
      </ResponsiveContainer>
    </Box>
  </div>
);

const Merchant = () => (
  <div>
    <SectionTitle title="Merchant Performance Analytics" sub="Post-acquisition value · Retention · LTV vs CAC"/>
    <Grid>
      <KPICard label="Avg. Monthly Volume" value="$38.4K" delta={11}  icon={CreditCard} color={C.accent}/>
      <KPICard label="Avg. LTV"            value="$27.8K" delta={8}   icon={Building2}  color={C.gold}/>
      <KPICard label="Overall Churn Rate"  value="8.2%"   delta={-3}  icon={TrendingDown}color={C.green}  sub="Improved YoY"/>
      <KPICard label="LTV:CAC Ratio"       value="9.1×"   delta={6}   icon={Gauge}      color={C.purple}/>
    </Grid>
    <Row>
      <Box title="Vertical LTV & Churn Comparison" flex={3} minW={320}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={verticalData} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="vertical" tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000).toFixed(0)}K`}/>
            <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/>
            <Tooltip content={<TT/>}/>
            <Legend iconType="circle" iconSize={7} formatter={v=><span style={{color:C.muted,fontSize:10}}>{v}</span>}/>
            <Bar yAxisId="l" dataKey="ltv"   fill={C.accent} radius={[4,4,0,0]} name="LTV ($)"/>
            <Bar yAxisId="r" dataKey="churn" fill={C.red}    radius={[4,4,0,0]} name="Churn (%)"/>
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Box title="Volume by Vertical" flex={2} minW={250}>
        <div style={{display:"flex",flexDirection:"column"}}>
          <ResponsiveContainer width="100%" height={155}>
            <PieChart margin={{top:0,right:0,bottom:0,left:0}}>
              <Pie
                data={verticalData} dataKey="vol" nameKey="vertical"
                cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                paddingAngle={4} isAnimationActive={false}
              >
                {verticalData.map((e,i)=><Cell key={i} fill={C.chart[i]}/>)}
              </Pie>
              <Tooltip content={<TT/>}/>
            </PieChart>
          </ResponsiveContainer>
          <PieLegend data={verticalData.map(d=>({name:d.vertical,value:`$${(d.vol/1000).toFixed(0)}K`}))} colors={C.chart}/>
        </div>
      </Box>
    </Row>
    <Row>
      <Box title="Cohort Retention by Vertical · 24 Months" flex={3} minW={340}>
        <ResponsiveContainer width="100%" height={195}>
          <LineChart data={cohortData}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="month" tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false} domain={[40,100]} tickFormatter={v=>`${v}%`}/>
            <Tooltip content={<TT/>} formatter={v=>`${v}%`}/>
            <Legend iconType="circle" iconSize={7} formatter={v=><span style={{color:C.muted,fontSize:10}}>{v}</span>}/>
            {["Restaurant","Retail","GasStation","Salon"].map((k,i)=>(
              <Line key={k} type="monotone" dataKey={k} stroke={C.chart[i]} strokeWidth={2} dot={false}/>
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Box title="AI Merchant Intelligence" flex={2} minW={260}>
        {allInsights.merchant.map((ins,i)=><InsightCard key={i} insight={ins}/>)}
      </Box>
    </Row>
  </div>
);

const Competitive = () => {
  const compTable = [
    {brand:"OVVI",      sov:"31%", sent:74, mentions:"4,218", trend:"+4pt", up:true},
    {brand:"Clover",    sov:"24%", sent:63, mentions:"3,102", trend:"+1pt", up:true},
    {brand:"Toast",     sov:"19%", sent:58, mentions:"2,847", trend:"−2pt", up:false},
    {brand:"Square",    sov:"14%", sent:54, mentions:"2,214", trend:"−1pt", up:false},
    {brand:"Lightspeed",sov:"8%",  sent:61, mentions:"987",   trend:"+2pt", up:true},
  ];
  return (
    <div>
      <SectionTitle title="Brand & Competitive Intelligence" sub="Share of voice · Sentiment · Competitor tracking"/>
      <Grid>
        <KPICard label="Share of Voice"       value="31%"    delta={4}   icon={Radio}      color={C.accent} sub="Rank #1 in POS"/>
        <KPICard label="Sentiment Score"      value="74/100" delta={6}   icon={Sparkles}   color={C.green}/>
        <KPICard label="Brand Mentions MTD"   value="4,218"  delta={19}  icon={Megaphone}  color={C.gold}/>
        <KPICard label="New Backlink Domains" value="+312"   delta={22}  icon={Globe}      color={C.purple} sub="MTD"/>
      </Grid>
      <Row>
        {/* FIXED PIE: custom legend below, no Recharts Legend, cy=50%, isAnimationActive=false */}
        <Box title="Share of Voice — Top 6 Players" flex={2} minW={250}>
          <div style={{display:"flex",flexDirection:"column"}}>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart margin={{top:0,right:0,bottom:0,left:0}}>
                <Pie
                  data={competitorSOV} dataKey="value" nameKey="name"
                  cx="50%" cy="50%" innerRadius={48} outerRadius={72}
                  paddingAngle={3} isAnimationActive={false}
                >
                  {competitorSOV.map((e,i)=><Cell key={i} fill={C.chart[i%C.chart.length]}/>)}
                </Pie>
                <Tooltip content={<TT/>} formatter={v=>`${v}%`}/>
              </PieChart>
            </ResponsiveContainer>
            <PieLegend
              data={competitorSOV.map(d=>({name:d.name,value:`${d.value}%`,pct:false}))}
              colors={C.chart}
            />
          </div>
        </Box>

        <Box title="Sentiment Score Trend · 12 Months" flex={3} minW={320}>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={sentimentData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="month" tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false} domain={[45,85]}/>
              <Tooltip content={<TT/>}/>
              <Legend iconType="circle" iconSize={7} formatter={v=><span style={{color:C.muted,fontSize:10}}>{v}</span>}/>
              {["OVVI","Clover","Toast","Square"].map((k,i)=>(
                <Line key={k} type="monotone" dataKey={k} stroke={C.chart[i]}
                  strokeWidth={k==="OVVI"?3:1.5} dot={false}
                  strokeDasharray={k==="OVVI"?"none":"4 2"}/>
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Row>
      <Row>
        <Box title="Competitor Comparison Matrix" flex={3} minW={360}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead>
              <tr>{["Brand","SOV","Sentiment","Mentions","30d Trend"].map(h=>(
                <th key={h} style={{color:C.muted,textAlign:"left",padding:"6px 12px",borderBottom:`1px solid ${C.border}`,fontWeight:500,fontSize:10,letterSpacing:"0.06em",textTransform:"uppercase"}}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {compTable.map((r,i)=>(
                <tr key={i} style={{background:i===0?`${C.accent}08`:"transparent"}}>
                  <td style={{padding:"10px 12px",color:i===0?C.accent:C.text,fontWeight:i===0?700:400,borderBottom:`1px solid ${C.border}`}}>{r.brand}</td>
                  <td style={{padding:"10px 12px",color:C.text,borderBottom:`1px solid ${C.border}`}}>{r.sov}</td>
                  <td style={{padding:"10px 12px",borderBottom:`1px solid ${C.border}`}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{flex:1,background:C.border,borderRadius:3,height:5}}>
                        <div style={{width:`${r.sent}%`,height:"100%",background:r.sent>65?C.green:r.sent>55?C.gold:C.red,borderRadius:3}}/>
                      </div>
                      <span style={{color:C.text,fontSize:11,minWidth:20}}>{r.sent}</span>
                    </div>
                  </td>
                  <td style={{padding:"10px 12px",color:C.text,borderBottom:`1px solid ${C.border}`}}>{r.mentions}</td>
                  <td style={{padding:"10px 12px",borderBottom:`1px solid ${C.border}`}}>
                    <span style={{
                      display:"inline-flex",alignItems:"center",gap:3,
                      color:r.up?C.green:C.red,fontSize:11
                    }}>
                      {r.up ? <ArrowUpRight size={11}/> : <ArrowDownRight size={11}/>}
                      {r.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
        <Box title="AI Competitive Intelligence" flex={2} minW={260}>
          {allInsights.competitive.map((ins,i)=><InsightCard key={i} insight={ins}/>)}
        </Box>
      </Row>
    </div>
  );
};

const Partners = () => (
  <div>
    <SectionTitle title="Partner & Channel Tracking" sub="ISO performance · Regional coverage · Commission intelligence"/>
    <Grid>
      <KPICard label="Active Partners"        value="10"    delta={2}   icon={Handshake}  color={C.accent} sub="2 newly onboarded"/>
      <KPICard label="Partner-Sourced Leads"  value="241"   delta={31}  icon={Users}      color={C.green}/>
      <KPICard label="Avg. Partner Conv."     value="11.9%" delta={8}   icon={Target}     color={C.gold}/>
      <KPICard label="Partner Revenue YTD"    value="$961K" delta={18}  icon={DollarSign} color={C.purple}/>
    </Grid>
    <Row>
      <Box title="Partner Leaderboard" flex={3} minW={340}>
        {partnerData.map((p,i)=>(
          <div key={i} style={{
            display:"flex",alignItems:"center",gap:14,padding:"10px 14px",marginBottom:8,
            background:i===0?`${C.gold}12`:C.surface,
            border:`1px solid ${i===0?C.gold+"44":C.border}`,borderRadius:8
          }}>
            <div style={{color:C.muted,fontSize:10,width:14}}>{i+1}</div>
            <div style={{flex:1}}>
              <div style={{color:C.text,fontSize:12,fontWeight:600}}>{p.name}</div>
              <div style={{display:"flex",alignItems:"center",gap:4,marginTop:2}}>
                <MapPin size={10} color={C.muted}/>
                <span style={{color:C.muted,fontSize:10}}>{p.region}</span>
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{color:C.accent,fontSize:12,fontWeight:700}}>{p.leads} leads</div>
              <div style={{color:C.muted,fontSize:10}}>{p.conv}% conv.</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{color:C.gold,fontSize:13,fontWeight:700}}>${(p.revenue/1000).toFixed(0)}K</div>
              <div style={{color:C.muted,fontSize:9}}>revenue</div>
            </div>
          </div>
        ))}
      </Box>
      <Box title="Revenue by Partner" flex={2} minW={260}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={partnerData} layout="vertical" barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false}/>
            <XAxis type="number" tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000).toFixed(0)}K`}/>
            <YAxis dataKey="name" type="category" tick={{fill:C.muted,fontSize:10}} axisLine={false} tickLine={false} width={90}/>
            <Tooltip content={<TT/>}/>
            <Bar dataKey="revenue" radius={[0,4,4,0]} name="Revenue ($)">
              {partnerData.map((e,i)=><Cell key={i} fill={C.chart[i]}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Row>
    <Box title="AI Partner Intelligence">
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {allInsights.partners.map((ins,i)=><InsightCard key={i} insight={ins}/>)}
      </div>
    </Box>
  </div>
);

// ─── NAV CONFIG ───────────────────────────────────────────────────────────────

const MODULES = [
  {id:"executive",  label:"Executive",      Icon:LayoutDashboard, C:Executive},
  {id:"marketing",  label:"Marketing",      Icon:Megaphone,       C:Marketing},
  {id:"sales",      label:"Sales Pipeline", Icon:GitMerge,        C:Sales},
  {id:"merchant",   label:"Merchants",      Icon:Store,           C:Merchant},
  {id:"competitive",label:"Competitive",    Icon:Search,          C:Competitive},
  {id:"partners",   label:"Partners",       Icon:Handshake,       C:Partners},
];

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function OVVIDashboard() {
  const [active,   setActive]   = useState("executive");
  const [dateRange,setDateRange]= useState("MTD");
  const [vertical, setVertical] = useState("All Verticals");
  const [role,     setRole]     = useState("Executive");

  const Mod = MODULES.find(m=>m.id===active)?.C || Executive;

  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",background:C.bg,minHeight:"100vh",color:C.text}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:${C.bg}}
        ::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px}
        select,button{outline:none;font-family:'DM Sans',sans-serif}
      `}</style>

      {/* ── HEADER ── */}
      <div style={{
        background:C.surface,borderBottom:`1px solid ${C.border}`,
        padding:"0 24px",display:"flex",alignItems:"center",
        justifyContent:"space-between",height:56,
        position:"sticky",top:0,zIndex:100
      }}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{
            background:`linear-gradient(135deg,${C.accent},${C.purple})`,
            borderRadius:8,width:30,height:30,display:"flex",alignItems:"center",
            justifyContent:"center",flexShrink:0
          }}>
            <Zap size={15} color="#fff" strokeWidth={2.5}/>
          </div>
          <div>
            <div style={{fontSize:14,fontWeight:700,color:C.text,letterSpacing:"-0.02em",lineHeight:1.2}}>OVVI POS</div>
            <div style={{fontSize:9,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase"}}>Revenue Intelligence</div>
          </div>
          <div style={{width:1,height:22,background:C.border,margin:"0 6px"}}/>
          <div style={{fontSize:11,color:C.muted}}>
            Showing: <span style={{color:C.gold,fontWeight:600}}>{dateRange}</span>
            {" · "}<span style={{color:C.accent}}>{vertical}</span>
            {" · "}<span style={{color:C.purple}}>{role} View</span>
          </div>
        </div>

        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {["MTD","QTD","YTD"].map(r=>(
            <button key={r} onClick={()=>setDateRange(r)} style={{
              background:dateRange===r?`${C.accent}20`:"transparent",
              border:`1px solid ${dateRange===r?C.accent:C.border}`,
              color:dateRange===r?C.accent:C.muted,
              borderRadius:20,padding:"3px 12px",fontSize:10,cursor:"pointer",transition:"all 0.15s"
            }}>{r}</button>
          ))}
          <div style={{width:1,height:18,background:C.border}}/>
          <select value={vertical} onChange={e=>setVertical(e.target.value)} style={{
            background:C.panel,border:`1px solid ${C.border}`,color:C.text,
            borderRadius:6,padding:"4px 8px",fontSize:10,cursor:"pointer"
          }}>
            {["All Verticals","Restaurant","Retail","Gas Station","Salon/Spa"].map(v=><option key={v}>{v}</option>)}
          </select>
          <select value={role} onChange={e=>setRole(e.target.value)} style={{
            background:C.panel,border:`1px solid ${C.border}`,color:C.text,
            borderRadius:6,padding:"4px 8px",fontSize:10,cursor:"pointer"
          }}>
            {["Executive","Sales","Marketing","Partner Manager"].map(v=><option key={v}>{v}</option>)}
          </select>
          <div style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",background:`${C.green}15`,border:`1px solid ${C.green}44`,borderRadius:20}}>
            <div style={{width:5,height:5,borderRadius:"50%",background:C.green,boxShadow:`0 0 6px ${C.green}`}}/>
            <span style={{color:C.green,fontSize:9,letterSpacing:"0.06em",fontWeight:600}}>LIVE</span>
          </div>
        </div>
      </div>

      <div style={{display:"flex"}}>
        {/* ── SIDEBAR ── */}
        <div style={{
          width:188,background:C.surface,borderRight:`1px solid ${C.border}`,
          padding:"18px 10px",minHeight:"calc(100vh - 56px)",
          position:"sticky",top:56,flexShrink:0,alignSelf:"flex-start"
        }}>
          <div style={{color:C.muted,fontSize:9,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10,paddingLeft:8}}>Modules</div>
          {MODULES.map(({id,label,Icon})=>{
            const isActive = active===id;
            return (
              <button key={id} onClick={()=>setActive(id)} style={{
                display:"flex",alignItems:"center",gap:9,width:"100%",
                background:isActive?`${C.accent}14`:"transparent",
                border:`1px solid ${isActive?C.accent+"44":"transparent"}`,
                borderRadius:8,padding:"8px 10px",cursor:"pointer",
                color:isActive?C.accent:C.muted,
                fontSize:11,marginBottom:3,textAlign:"left",transition:"all 0.12s"
              }}>
                <Icon size={13} strokeWidth={isActive?2:1.5}/>
                {label}
              </button>
            );
          })}

          <div style={{marginTop:22,padding:"12px 10px",background:C.panel,borderRadius:8,border:`1px solid ${C.border}`}}>
            <div style={{color:C.muted,fontSize:9,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>AI Engine</div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:C.green,boxShadow:`0 0 6px ${C.green}`}}/>
              <span style={{color:C.text,fontSize:10}}>All Models Active</span>
            </div>
            <div style={{color:C.muted,fontSize:9,marginBottom:2}}>Last sync: 2 min ago</div>
            <div style={{color:C.muted,fontSize:9}}>14 anomalies detected</div>
          </div>

          <div style={{marginTop:10,padding:"10px",background:`${C.gold}10`,borderRadius:8,border:`1px solid ${C.gold}33`}}>
            <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:3}}>
              <FileText size={10} color={C.gold}/>
              <span style={{color:C.gold,fontSize:9,fontWeight:600}}>Weekly Report Ready</span>
            </div>
            <div style={{color:C.muted,fontSize:9}}>Q4 Week 8 summary generated</div>
          </div>

          <div style={{marginTop:10,padding:"10px",background:`${C.purple}10`,borderRadius:8,border:`1px solid ${C.purple}33`}}>
            <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:3}}>
              <Download size={10} color={C.purple}/>
              <span style={{color:C.purple,fontSize:9,fontWeight:600}}>Export</span>
            </div>
            <div style={{color:C.muted,fontSize:9}}>PDF · CSV · Slides</div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div style={{flex:1,padding:"26px 26px 48px",overflow:"auto"}}>
          <Mod/>
        </div>
      </div>
    </div>
  );
}
