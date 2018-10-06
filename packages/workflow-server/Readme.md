# Workflow Server

## todo

[ ] make the chrome extension not terminate
[ ] make iterm handle closing the iterm window
[ ] add a broadcast message to reconnect to apps which where started before workflow-server


### Example interactions

1. <SplitV> <Term /> <Atom /> </SplitV>

-createOrGetId(Term) -> appId
-createOrGetId(Atom) -> appId

>open(Term) -> cwd,cmd,appId,position <- windowId (wm)
>open(Atom) -> file,appId,position <- windowId (wm)

<register(Term) -> appId,send
<register(Atom) -> appId,send

>update(Term) -> send,cwd,cmd (server)
>update(Atom) -> send,file (server)


         SplitV
    /             \
  Term           Atom


2. <SplitH> <Term /> <Atom /> </SplitH>

-allocateRegistry
-createOrGetId(Term) -> appId,send,windowId
-createOrGetId(Atom) -> appId,send,windowId

>update(Term) -> windowId,position (wm)
>update(Atom) -> windowId,position (wm)

3. <SplitV> <Term /> <Emacs /> </SplitV>

-
-createOrGetId(Term) -> appId,send,windowId
-createOrGetId(Emacs) -> appId,send,windowId

>open(Emacs) -> file,appId,position <-windowId (wm)
>close/minimize(Atom) -> windowId (wm)

<register(Emacs) appId,send

>update(Term) -> windowId,position (wm)
>update(Emacs) -> send,file (server)


apply() {
  const flow = server.register(flow);
  
  flow = wm.apply(flow, server.registry);
  
  server.updateRegister(flow);
}

