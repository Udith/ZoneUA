<%@ Page Title="ZoneUA | Boxes" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="boxes.aspx.cs" Inherits="boxes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <link rel="stylesheet" href="../css/boxesStyle.css" type="text/css">
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div class="container marketing">
    <div id = "header">
		<img src="../images/boxes/title.png" alt="Shoot the Boxes" width="500" height="100" />
	</div>
	<div id="main" role="main">
			<!--<img src="images/title.png" alt="Shoot the Boxes" width="500" height="100" /></a> -->
			<canvas id="game" width="800" height="400">
				<noscript><span id="warn">Please enable JavaScript in your browser!</span></noscript>
			</canvas>			
	</div>
	<br />
	<div id="scores">
		<span id="cat">
			<strong>Shots Fired:</strong>
			<span id="shots">0</span>
		</span>
		
		<span id="cat">		
	    	<strong>Hits:</strong>
			<span id="hits">0</span>
		</span>
		
		<span id="cat">
			<strong>Misses:</strong>
			<span id="misses">0</span>
		</span>
		
		<span id="cat">
			<strong>Accuracy:</strong>
			<span id="acc">0</span>
		</span>
	</div>
        </div>
    <script src="../js/boxes/boxesJS.js" type="text/javascript"></script>
</asp:Content>

