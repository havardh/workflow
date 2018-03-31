# Set prompt to '# '

$PROFILE="$Home\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1"

new-item -itemtype file -path $PROFILE -force
Set-ExecutionPolicy RemoteSigned
echo 'function prompt {"# "}' > $PROFILE

# Set PowerShell window title to 'PowerShell'
echo '$host.ui.RawUI.WindowTitle = "PowerShell"' >> $PROFILE 

# Hide taskbar
$p='HKCU:SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\StuckRects3'
$v=(Get-ItemProperty -Path $p).Settings
$v[8]=3
&Set-ItemProperty -Path $p -Name Settings -Value $v
&Stop-Process -f -ProcessName explorer